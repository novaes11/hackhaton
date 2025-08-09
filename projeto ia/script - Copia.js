// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação do header ao rolar
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Animação dos cards ao entrar na viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .fan-card, .chart-card, .campaign-card').forEach(card => {
        observer.observe(card);
    });

    // Configuração dos gráficos médicos
    // Gráfico de Evolução da Pressão Arterial
    const pressureCtx = document.getElementById('pressureChart').getContext('2d');
    const pressureChart = new Chart(pressureCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
            datasets: [{
                label: 'Pressão Sistólica (mmHg)',
                data: [140, 145, 150, 155, 160, 165, 170, 175],
                borderColor: '#FF4655',
                backgroundColor: 'rgba(255, 70, 85, 0.1)',
                fill: true,
                tension: 0.4,
                yAxisID: 'y'
            }, {
                label: 'Pressão Diastólica (mmHg)',
                data: [90, 92, 95, 98, 100, 102, 105, 108],
                borderColor: '#0F1923',
                backgroundColor: 'rgba(15, 25, 35, 0.1)',
                fill: true,
                tension: 0.4,
                yAxisID: 'y'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: false,
                    min: 80,
                    max: 200,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    // Gráfico de Fatores de Risco
    const riskFactorsCtx = document.getElementById('riskFactorsChart').getContext('2d');
    const riskFactorsChart = new Chart(riskFactorsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Obesidade', 'Sedentarismo', 'Histórico Familiar', 'Diabetes', 'Tabagismo', 'Estresse'],
            datasets: [{
                data: [35, 25, 20, 15, 10, 15],
                backgroundColor: [
                    '#FF4655',
                    '#0F1923',
                    '#7B2CBF',
                    '#28a745',
                    '#ffc107',
                    '#17a2b8'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Gráfico de Medicações
    const medicationsCtx = document.getElementById('medicationsChart').getContext('2d');
    const medicationsChart = new Chart(medicationsCtx, {
        type: 'bar',
        data: {
            labels: ['Captopril', 'Losartana', 'Amlodipina', 'Hidroclorotiazida', 'Enalapril', 'Valsartana'],
            datasets: [{
                label: 'Pacientes em Uso',
                data: [45, 38, 32, 28, 25, 22],
                backgroundColor: [
                    '#FF4655',
                    '#0F1923',
                    '#7B2CBF',
                    '#28a745',
                    '#ffc107',
                    '#17a2b8'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Resultados Laboratoriais
    const labResultsCtx = document.getElementById('labResultsChart').getContext('2d');
    const labResultsChart = new Chart(labResultsCtx, {
        type: 'radar',
        data: {
            labels: ['Glicemia', 'Colesterol Total', 'HDL', 'LDL', 'Triglicerídeos', 'Creatinina'],
            datasets: [{
                label: 'Valores Atuais',
                data: [120, 220, 45, 140, 180, 1.2],
                borderColor: '#FF4655',
                backgroundColor: 'rgba(255, 70, 85, 0.2)',
                pointBackgroundColor: '#FF4655',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#FF4655'
            }, {
                label: 'Valores Normais',
                data: [100, 200, 50, 130, 150, 1.0],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                pointBackgroundColor: '#28a745',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#28a745'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 250
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    // Simulação de dados em tempo real para dados médicos
    function updateMedicalNumbers() {
        const numbers = document.querySelectorAll('.number');
        numbers.forEach(number => {
            const currentValue = parseInt(number.textContent.replace(/,/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 5);
            number.textContent = newValue.toLocaleString();
        });
    }

    // Atualiza os números a cada 10 segundos
    setInterval(updateMedicalNumbers, 10000);

    // Atualiza os gráficos médicos a cada 5 segundos
    setInterval(() => {
        // Atualiza dados do gráfico de pressão
        pressureChart.data.datasets[0].data = pressureChart.data.datasets[0].data.map(
            value => value + (Math.random() * 10 - 5)
        );
        pressureChart.data.datasets[1].data = pressureChart.data.datasets[1].data.map(
            value => value + (Math.random() * 6 - 3)
        );
        pressureChart.update();

        // Atualiza dados do gráfico de fatores de risco
        riskFactorsChart.data.datasets[0].data = riskFactorsChart.data.datasets[0].data.map(
            value => value + (Math.random() * 5 - 2.5)
        );
        riskFactorsChart.update();
    }, 5000);

    // Adiciona classe active ao link de navegação atual
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav a');

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Adiciona interatividade aos cards de pacientes
    document.querySelectorAll('.fan-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });

    // Adiciona interatividade aos cards de diagnóstico
    document.querySelectorAll('.campaign-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });

    // Animação das barras de progresso
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    // Executa animação das barras de progresso quando a seção de diagnóstico estiver visível
    const diagnosisSection = document.querySelector('#diagnostico');
    const diagnosisObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                diagnosisObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    diagnosisObserver.observe(diagnosisSection);

    // Simulação de alertas médicos em tempo real
    function simulateMedicalAlerts() {
        const alertCard = document.querySelector('.card:last-child .number');
        if (alertCard) {
            const currentAlerts = parseInt(alertCard.textContent);
            const newAlerts = currentAlerts + Math.floor(Math.random() * 3);
            alertCard.textContent = newAlerts;
            
            // Adiciona efeito visual para novos alertas
            alertCard.style.color = '#dc3545';
            setTimeout(() => {
                alertCard.style.color = '';
            }, 2000);
        }
    }

    // Simula alertas médicos a cada 15 segundos
    setInterval(simulateMedicalAlerts, 15000);
}); 