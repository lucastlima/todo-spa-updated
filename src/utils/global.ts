import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  :root {
    /* colors */
    --yellow: #f7ab1b;
    --white: #fff;
    --dark-blue: #093554;
    --blue: #058ed8;
    --light-blue: #058ed8;
    --error: #cc0000;
    /* shadows */
    --shadow-one: 0 1px 3px rgba(9, 53, 84, 0.12), 0 1px 2px rgba(9, 53, 84, 0.24);
    --shadow-two: 0 3px 6px rgba(9, 53, 84, 0.16), 0 3px 6px rgba(9, 53, 84, 0.23);
    --shadow-tree: 0 10px 20px rgba(9, 53, 84,0.19), 0 6px 6px rgba(9, 53, 84,0.23);
    --shadow-four: 0 14px 28px rgba(9, 53, 84,0.25), 0 10px 10px rgba(9, 53, 84,0.22);
    --shadow-five: 0 19px 38px rgba(9, 53, 84,0.30), 0 15px 12px rgba(9, 53, 84,0.22);    
  }

  html {
    box-sizing: border-box;
    line-height: 1.15;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  body, html {
    height: 100%;
  }

  body {
  margin: 0;
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #212529;
  background: linear-gradient(135deg, #093554 0%, #058ed8 50%, #f4ebc9 100%);
}

h1, h2,h3,h4,h5,p {
  margin: 0.3rem 0;
}

  #root {
    display: flex;
    height: 100%;
  }   

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes todoIn {
    0% {
      opacity: 0;
      transform: translateY(-20px)
    }
    60% {
      transform: translateX(0)
    }
    100% {
      opacity: 1;      
    }
  }


  input:focus, textarea:focus {
    outline: none !important;
    box-shadow: 0 0 0.2rem 0.1rem rgba(5, 142, 216, 0.8);
  }

  .highlight {
    box-shadow: 0 0 2px 3px #f7ab1b !important;
  }
`;
