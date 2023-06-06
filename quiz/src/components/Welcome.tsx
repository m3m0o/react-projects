import WelcomeImage from '../img/quiz.svg';

import './Welcome.css';

const Welcome = () => {
    return (
      <section id="welcome">
          <h2>Olá, seja bem-vindo!</h2>

          <p>Clique no botão abaixo para iniciar o Quiz</p>

          <button>Iniciar</button>

          <img src={WelcomeImage} alt="Início do Quiz" />
      </section>
    )
}

export default Welcome