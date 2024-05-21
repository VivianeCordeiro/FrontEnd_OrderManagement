import React from 'react';
//import { useNavigate } from 'react-router-dom';
//import '../../styles/dashboard.scss'; // Certifique-se de importar o arquivo de estilo corretamente

interface ItemProps {
  href?: string;
  children?: React.ReactNode; // Corrigindo a tipagem da prop children
}

const Footer: React.FC = () => {
  //const navigate = useNavigate();
  //const width = window.innerWidth;
  
  return (
    <div className='Footer'>
      { (
        <div className="miniContainerFooter">
          <h5>teste</h5>
          <ul>Rua</ul>
        </div>
      ) }
      <div className="miniContainerFooter">
        <h5>Principal</h5>
        <button onClick={() => {}}>
          Cavidade
        </button>
        <button onClick={() => {}}>
          Ativação
        </button>
        <button onClick={() => {}}>
          Forno
        </button>
      </div>
      <div className="miniContainerFooter1">
        <Item href="https://www.honeywell.com/us/en/terms-and-conditions">Termos e Condições</Item>
        <Item>
          A Onion processará suas informações pessoais com a finalidade de fornecer serviços a você de acordo com a{' '}
          <a style={{ marginLeft: '.2em' }} href="https://www.honeywell.com/us/en/privacy-statement#portuguese">
            Declaração de Privacidade
          </a>
          .
        </Item>
      </div>
    </div>
  );
};

const Item: React.FC<ItemProps> = ({ href, children }) => {
  if (href) {
    return <a href={href}>{children}</a>;
  }
  return <>{children}</>;
};

export default Footer;
