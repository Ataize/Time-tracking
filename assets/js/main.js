
// Carregar dados JSON e inicializar a aplicação
let json;
fetch('./data.json')
    .then(response => response.json())
    .then(data => json = data)        
    .catch(error => console.error('Erro ao carregar JSON:', error));

   
// Função para determinar o período baseado no timeframe
function getPeriodLabel(timeframe) {
    let period;
    if (timeframe === 'daily') {
        period = "Day";
    } else if (timeframe === 'weekly') {
        period = "Week";
    } else if (timeframe === 'monthly') {
        period = "Month";
    } else {
        period = "Unknown"; // Tratamento para valores inesperados
    }

    return period;
}

// Função para criar as seções de atividade
function createActivitySections(data, timeframe) {
    const activityContainer = document.getElementById('activity-container');

    if (!activityContainer) {
        console.error('Elemento "activity-container" não encontrado.');
        return;
    }

    activityContainer.innerHTML = ''; // Limpar o conteúdo atual

    const periodLabel = getPeriodLabel(timeframe);

    for (const item of data) {
        const timeframes = item.timeframes[timeframe];

        if (timeframes) {
            const sectionHTML = `
            <section class="activity ${item.title}">
                <div class="activities__container">
                    <div>
                        <p class="title">${item.title}</p>
                        <button><img src="./assets/images/icon-ellipsis.svg" alt="botão de opções"></button>
                    </div>
                    <div class="timeframes">
                        <p class="current">${timeframes.current}hrs</p>
                        <p class="previous">Last ${periodLabel} - <span>${timeframes.previous}hrs</span></p>
                    </div>
                </div>
            </section>
            `;

            activityContainer.innerHTML += sectionHTML;
        } else {
            console.warn(`Timeframe "${timeframe}" não encontrado para o item com título "${item.title}".`);
        }
    }
}

// Adicionar event listeners aos botões
document.getElementById('dailyBtn').addEventListener('click', () => createActivitySections(json, 'daily'));
document.getElementById('weeklyBtn').addEventListener('click', () => createActivitySections(json, 'weekly'));
document.getElementById('monthlyBtn').addEventListener('click', () => createActivitySections(json, 'monthly'));
