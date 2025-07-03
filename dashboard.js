document.addEventListener("DOMContentLoaded", () => {
    const canvas1 = document.getElementById('dashborad-chart');
    const canvas2 = document.getElementById('keyword-chart');

    if (!canvas1 || !canvas2) {
        console.error("Canvas elements not found!");
        return;
    }

    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');

    fetch('http://localhost:3000/dashboard-data')
        .then(res => res.json())
        .then(data => {
            const labels = data.map(item => item.name);
            const stockData = data.map(item => item.stock);
            const salesData = data.map(item => item.totalPurchases);
            const ratingData = data.map(item => item.averageRating);

            new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Stock',
                            data: stockData,
                            backgroundColor: '#4CAF50'
                        },
                        {
                            label: 'Sales',
                            data: salesData,
                            backgroundColor: '#2196F3'
                        },
                        {
                            label: 'Avg. Rating',
                            data: ratingData,
                            backgroundColor: '#FFC107'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            const Keywords = ['good', 'great', 'excellent', 'love', 'nice', 'bad', 'disappoint', 'broken', 'poor', 'terrible'];
            const keywordCounts = Keywords.map(k => {
                return data.reduce((sum, item) => {
                    const count = (item.positiveCounts?.[k] || 0) + (item.negativeCounts?.[k] || 0);
                    return sum + count;
                }, 0);
            });

            new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: Keywords,
                    datasets: [{
                        label: 'Keyword Frequency in Reviews',
                        data: keywordCounts,
                        backgroundColor: Keywords.map(k =>
                            ['bad', 'disappoint', 'broken', 'poor', 'terrible'].includes(k) ? '#F44336' : '#4CAF50'
                        )
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Frequency'
                            }
                        }
                    }
                }
            });
        })
        .catch(err => {
            console.error("Failed to fetch dashboard data:", err);
        });
});
