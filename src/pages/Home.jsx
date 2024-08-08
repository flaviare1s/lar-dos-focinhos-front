import banner from '../assets/images/banner.jpg';
import '../pages/Home.css';

const Home = () => {
  return (
    <main className='home'>
      <picture className="banner">
        <img className="banner-img" src={banner} alt="banner" />
      </picture>
      <div className='content'>
        <h1 className='text-center'>Bem vindo ao Lar dos Focinhos!</h1>
        <h2 className='text-center'>Um hotel bom pra cachorro!</h2>
        <p>No Lar dos Focinhos, oferecemos um ambiente seguro e acolhedor para o seu pet. Nossos serviços incluem:</p>
        <ul>
          <li><strong>Hospedagem Confortável:</strong> Quartos espaçosos e confortáveis para que seu pet se sinta em casa.</li>
          <li><strong>Cuidados Personalizados:</strong> Cada hóspede recebe atenção individualizada para garantir seu bem-estar.</li>
          <li><strong>Atividades Recreativas:</strong> Brincadeiras, passeios e muito mais para manter seu pet feliz e ativo.</li>
          <li><strong>Alimentação Saudável:</strong> Refeições balanceadas e de acordo com as necessidades nutricionais do seu pet.</li>
          <li><strong>Monitoramento 24/7:</strong> Equipe treinada disponível o tempo todo para garantir a segurança do seu amigo.</li>
          <li><strong>Serviços Veterinários:</strong> Assistência médica disponível em caso de necessidade.</li>
        </ul>
        <p>Venha nos visitar e descubra o melhor lugar para o seu amigo de quatro patas! Estamos ansiosos para conhecer você e seu pet.</p>
      </div>
    </main>
  );
}

export default Home;

