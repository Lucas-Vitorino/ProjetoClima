async function buscarClima() {
    const cidadeInput = document.getElementById('cidade');
    const cidade = cidadeInput.value;
    if (!cidade) return;
  
    salvarPesquisa(cidade);
  
    const response = await fetch(`/api/clima?cidade=${cidade}`);
    const data = await response.json();
  
    const resultado = document.getElementById('resultado');
    if (data.cod === 200) {
      resultado.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].description}</p>
        <p>${data.main.temp}°C</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Ícone Clima">
      `;
    } else {
      resultado.innerHTML = `<p>Não foi possível encontrar a cidade.</p>`;
    }
  }
  
  function salvarPesquisa(cidade) {
    let pesquisas = JSON.parse(localStorage.getItem('pesquisas')) || [];
    if (!pesquisas.includes(cidade)) {
      pesquisas.unshift(cidade);
      if (pesquisas.length > 5) pesquisas.pop();
      localStorage.setItem('pesquisas', JSON.stringify(pesquisas));
    }
  }
  
  document.getElementById('cidade').addEventListener('input', mostrarSugestoes);
  
  function mostrarSugestoes() {
    const sugestoesDiv = document.getElementById('sugestoes');
    sugestoesDiv.innerHTML = '';
    const pesquisas = JSON.parse(localStorage.getItem('pesquisas')) || [];
    const input = document.getElementById('cidade').value.toLowerCase();
  
    const filtradas = pesquisas.filter(cidade => cidade.toLowerCase().startsWith(input));
  
    filtradas.forEach(cidade => {
      const div = document.createElement('div');
      div.textContent = cidade;
      div.onclick = () => {
        document.getElementById('cidade').value = cidade;
        sugestoesDiv.innerHTML = '';
        buscarClima();
      };
      sugestoesDiv.appendChild(div);
    });
  }
  
  document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  