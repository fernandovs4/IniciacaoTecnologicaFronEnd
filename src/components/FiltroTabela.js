import React, { useEffect, useState } from 'react';
import styles from './Filtro.module.css';

const FiltroTabela = (props) => {
  const [fasesSelecionadas, setFasesSelecionadas] = useState(['todas']);
  const [stdAgesSelecionadas, setStdAgesSelecionadas] = useState(['todas']);
  const [gendersSelecionados, setGendersSelecionados] = useState(['todas']);
  const [statusSelecionados, setStatusSelecionados] = useState(['todas']);
  const [dataInicial, setDataInicial] = useState('2000-01-01');
  const [dataFinal, setDataFinal] = useState('2023-01-01');
  const [idade_min, setIdade_min] = useState('');
  const [idade_max, setIdade_max] = useState('');

  useEffect(() => {
    let fases = '';
    let stdage = '';
    let gender = '';
    let status = '';
    for (let i =0; i < fasesSelecionadas.length; i++){
      if (i < fasesSelecionadas.length - 1){
        fases += fasesSelecionadas[i] + ",";
      }else{
        fases += fasesSelecionadas[i];
      }
    }

    for (let i =0; i < stdAgesSelecionadas.length; i++){
      if (i < stdAgesSelecionadas.length - 1){
        stdage += stdAgesSelecionadas[i] + ",";
      }else{
        stdage += stdAgesSelecionadas[i];
      }
    }

    for (let i =0; i <gendersSelecionados.length; i++){
      if (i < gendersSelecionados.length - 1){
        gender += gendersSelecionados[i] + ",";
      }else{
        gender += gendersSelecionados[i];
      }
    }

    for (let i =0; i < statusSelecionados.length; i++){
      if (i < statusSelecionados.length - 1){
        status += statusSelecionados[i] + ",";
      }else{
        status += statusSelecionados[i];
      }
    }
    let data_inicial =''
    let data_final =''
    if (dataInicial.length > 0){
     data_inicial  = dataInicial.substring(8,10) + "-" + dataInicial.substring(5,7) + "-" + dataInicial.substring(0,4)
    }
    if (dataFinal.length > 0){
      data_final = dataFinal.substring(8,10) + "-" + dataFinal.substring(5,7) + "-" + dataFinal.substring(0,4)
    }

    const url = `http://localhost:5000/construirTabela?&stdage=${stdage}&fase=${fases}&gender=${gender}&status=${status}&datainicial=${data_inicial}&datafinal=${data_final}`
    props.setUrl(url)
    console.log(url)

  }, [fasesSelecionadas, stdAgesSelecionadas, gendersSelecionados, statusSelecionados, dataInicial, dataFinal])


  console.log(fasesSelecionadas);
  console.log(stdAgesSelecionadas);
  console.log(gendersSelecionados);
  console.log(statusSelecionados);
  console.log(dataInicial);
  console.log(dataFinal);


  const handleFaseChange = (event) => {
    const { value } = event.target;

    if (value === 'todas') {
      // Se "todas" foi selecionado, desmarque todas as outras fases
      setFasesSelecionadas(['todas']);
    } else {
      // Caso contrário, desmarque "todas" se estiver selecionado
      const updatedFases = fasesSelecionadas.includes('todas')
        ? fasesSelecionadas.filter((fase) => fase !== 'todas')
        : fasesSelecionadas;

      // Marque/desmarque a fase selecionada
      if (updatedFases.includes(value)) {
        setFasesSelecionadas(updatedFases.filter((fase) => fase !== value));
      } else {
        setFasesSelecionadas([...updatedFases, value]);
      }
    }
  };

  const handleStdAgeChange = (event) => {
    const { value } = event.target;

    if (value === 'todas') {
      // Se "todas" foi selecionado, desmarque todas as outras idades
      setStdAgesSelecionadas(['todas']);
    } else {
      // Caso contrário, desmarque "todas" se estiver selecionado
      const updatedAges = stdAgesSelecionadas.includes('todas')
        ? stdAgesSelecionadas.filter((age) => age !== 'todas')
        : stdAgesSelecionadas;

      // Marque/desmarque a idade selecionada
      if (updatedAges.includes(value)) {
        setStdAgesSelecionadas(updatedAges.filter((age) => age !== value));
      } else {
        setStdAgesSelecionadas([...updatedAges, value]);
      }
    }
  };

  const handleGenderChange = (event) => {
    const { value } = event.target;

    if (value === 'todas') {
      // Se "todas" foi selecionado, desmarque todas os outros gêneros
      setGendersSelecionados(['todas']);
    } else {
      // Caso contrário, desmarque "todas" se estiver selecionado
      const updatedGenders = gendersSelecionados.includes('todas')
        ? gendersSelecionados.filter((gender) => gender !== 'todas')
        : gendersSelecionados;

      // Marque/desmarque o gênero selecionado
      if (updatedGenders.includes(value)) {
        setGendersSelecionados(updatedGenders.filter((gender) => gender !== value));
      } else {
        setGendersSelecionados([...updatedGenders, value]);
      }
    }
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;

    if (value === 'todas') {
      // Se "todas" foi selecionado, desmarque todas os outros status
      setStatusSelecionados(['todas']);
    } else {
      // Caso contrário, desmarque "todas" se estiver selecionado
      const updatedStatus = statusSelecionados.includes('todas')
        ? statusSelecionados.filter((status) => status !== 'todas')
        : statusSelecionados;

      // Marque/desmarque o status selecionado
      if (updatedStatus.includes(value)) {
        setStatusSelecionados(updatedStatus.filter((status) => status !== value));
      } else {
        setStatusSelecionados([...updatedStatus, value]);
      }
    }
  };

  const handleDataInicialChange = (event) => {
    const { value } = event.target;
    setDataInicial(value);
  };

  const handleDataFinalChange = (event) => {
    const { value } = event.target;
    setDataFinal(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <h2>Filtros de Pesquisa</h2>
        <div className={styles.opcoes}>
          <div className={styles.filterGroup}>
            <label>Selecione:</label>
            <div className={styles.dropdownGroup}>
              <select>
                <option className={styles.select} value="farmas">
                  Farmas
                </option>
                <option className={styles.select} value="clinicas">
                  Clínicas
                </option>
                <option className={styles.select} value="condicao">
                  Condição
                </option>
              </select>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Selecione:</label>
            <div className={styles.dropdownGroup}>
              <select>
                <option className={styles.select} value="farmas">
                  Farmas
                </option>
                <option className={styles.select} value="clinicas">
                  Clínicas
                </option>
                <option className={styles.select} value="condicao">
                  Condição
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Fase do Estudo:</label>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              value="todas"
              checked={fasesSelecionadas.includes('todas')}
              onChange={handleFaseChange}
            />
            <label>todas</label>
            <input
              type="checkbox"
              value="1"
              checked={fasesSelecionadas.includes('1')}
              onChange={handleFaseChange}
            />
            <label>Fase 1</label>
            <input
              type="checkbox"
              value="2"
              checked={fasesSelecionadas.includes('2')}
              onChange={handleFaseChange}
            />
            <label>Fase 2</label>
            <input
              type="checkbox"
              value="3"
              checked={fasesSelecionadas.includes('3')}
              onChange={handleFaseChange}
            />
            <label>Fase 3</label>
            <input
              type="checkbox"
              value="4"
              checked={fasesSelecionadas.includes('4')}
              onChange={handleFaseChange}
            />
            <label>Fase 4</label>
            <input
              name="nao_especificado"
              type="checkbox"
              value="nao_especificado"
              checked={fasesSelecionadas.includes('nao_especificado')}
              onChange={handleFaseChange}
            />
            <label name="nao_especificado">Não especificado</label>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Idade:</label>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              value="todas"
              checked={stdAgesSelecionadas.includes('todas')}
              onChange={handleStdAgeChange}
            />
            <label>todas</label>
            <input
              type="checkbox"
              value="Child"
              checked={stdAgesSelecionadas.includes('Child')}
              onChange={handleStdAgeChange}
            />
            <label>Criança</label>
            <input
              type="checkbox"
              value="Adult"
              checked={stdAgesSelecionadas.includes('Adult')}
              onChange={handleStdAgeChange}
            />
            <label>Adulto</label>
            <input
              type="checkbox"
              value="Older Adult"
              checked={stdAgesSelecionadas.includes('Older Adult')}
              onChange={handleStdAgeChange}
            />
            <label>Idoso</label>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Gênero:</label>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              value="todas"
              checked={gendersSelecionados.includes('todas')}
              onChange={handleGenderChange}
            />
            <label>todas</label>
            <input
              type="checkbox"
              value="masculino"
              checked={gendersSelecionados.includes('masculino')}
              onChange={handleGenderChange}
            />
            <label>Masculino</label>
            <input
              type="checkbox"
              value="feminino"
              checked={gendersSelecionados.includes('feminino')}
              onChange={handleGenderChange}
            />
            <label>Feminino</label>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Status do Estudo:</label>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              value="todas"
              checked={statusSelecionados.includes('todas')}
              onChange={handleStatusChange}
            />
            <label>todas</label>
            <input
              type="checkbox"
              value="completed"
              checked={statusSelecionados.includes('completed')}
              onChange={handleStatusChange}
            />
            <label>Completados</label>
            <input
              type="checkbox"
              value="recruiting"
              checked={statusSelecionados.includes('recruiting')}
              onChange={handleStatusChange}
            />
            <label>Recrutando</label>
            <input
              type="checkbox"
              value="Withdrawn"
              checked={statusSelecionados.includes('Withdrawn')}
              onChange={handleStatusChange}
            />
            <label>Withdrawn</label>
            <input
              type="checkbox"
              value="Approved for marketing"
              checked={statusSelecionados.includes('Approved for marketing')}
              onChange={handleStatusChange}
            />
            <label>Approved for marketing</label>
            <input
              type="checkbox"
              value=" Unknown status"
              checked={statusSelecionados.includes(' Unknown status')}
              onChange={handleStatusChange}
            />
            <label> Unknown status</label>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Data Inicial:</label>
          <div className={styles.checkboxGroup}>
            <input
              type="date"
              value={dataInicial}
              
              onChange={handleDataInicialChange}
            />
          </div>
          <label>Data Final:</label>
          <div className={styles.checkboxGroup}>
            <input
              type="date"
              value={dataFinal}
              onChange={handleDataFinalChange}
            />
          </div>
        </div>
      </div>

      {/* Aqui você pode adicionar a tabela ou qualquer outro conteúdo relacionado */}
    </div>
  );
};

export default FiltroTabela;