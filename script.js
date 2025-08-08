// script.js
function gerarPDF() {
    const element = document.getElementById('curriculo-content');

    const options = {
        margin: 10, // Margem de 10mm em todos os lados do PDF
        filename: 'curriculo_marcelo_barudi.pdf', // Nome do arquivo PDF
        image: { type: 'jpeg', quality: 0.98 }, // Qualidade da imagem (se houver)
        html2canvas: {
            scale: 2, // Aumenta a resolução para texto mais nítido no PDF
            dpi: 300, // Aumenta a densidade de pixels para melhor qualidade
            letterRendering: true, // Otimiza a renderização de texto
            useCORS: true // Importante para imagens de outros domínios
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, // Unidade, formato e orientação do PDF
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'] // Tenta evitar quebras dentro de elementos e **respeita o CSS de quebra de página**.
        }
    };

    setTimeout(() => {
        html2pdf().from(element).set(options).save();
    }, 500);
}