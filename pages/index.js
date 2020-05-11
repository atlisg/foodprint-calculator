import { FaCalculator, FaUtensils } from 'react-icons/fa';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import theme from '../styles/theme';
import Link from 'next/link';

const Index = () => {
  return (
    <Layout>
      <Header activePage="home" />
      <div className="front-page">
        <h1>Foodprint Calculator</h1>
        <h3>
          Calculate the environmental footprint of your meals
          <span className="utensils-container">
            <FaUtensils />
          </span>
        </h3>
        <p>
          This calculator enables us to visualize and compare how our meals impact our environment
          with respect to
          <Link href="/about">
            <a className="about-link land"> land use</a>
          </Link>
          ,
          <Link href="/about">
            <a className="about-link water"> water withdrawals</a>
          </Link>
          ,
          <Link href="/about">
            <a className="about-link ghg"> greenhouse gas emissions</a>
          </Link>
          , and
          <Link href="/about">
            <a className="about-link eutro"> eutrophying emissions</a>
          </Link>
          .
        </p>
        <Link href="/about">
          <a className="about-link">This is how.</a>
        </Link>
        <div className="button-container">
          <Button primary>
            <Link href="newmeal">
              <a className="lets-calculate">
                Let's Calculate
                <span className="calculator-container">
                  <FaCalculator />
                </span>
              </a>
            </Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .front-page {
          min-height: 100vh;
          padding: 40px 20px;
          margin: 0 auto;
        }
        .button-container {
          display: flex;
          justify-content: space-around;
          margin-top: 40px;
          width: 100%;
        }
        .calculator-container {
          display: flex;
          margin-left: 10px;
          font-size: 14px;
        }
        .utensils-container {
          font-size: 20px;
          margin-left: 10px;
        }
        .about-link {
          color: ${theme.colors.water};
          text-decoration: none;
          font-size: 16px;
        }
        .about-link:hover {
          opacity: 0.7;
        }
        .land {
          color: ${theme.colors.land};
        }
        .water {
          color: ${theme.colors.water};
        }
        .ghg {
          color: ${theme.colors.ghg};
        }
        .eutro {
          color: ${theme.colors.eutro};
        }
        h1 {
          font-size: 60px;
          font-weight: normal;
          margin-top: 120px;
        }
        h3 {
          font-size: 24px;
          font-weight: normal;
        }
        p {
          font-size: 16px;
          margin: 20px 0;
        }
        .lets-calculate {
          display: flex;
          align-items: center;
          color: #fff;
          text-decoration: none;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .front-page {
            max-width: 1520px;
            padding: 60px 40px;
          }
          .about-link {
            font-size: 20px;
          }
          h1 {
            font-size: 72px;
            margin-top: 150px;
          }
          h3 {
            font-size: 32px;
          }
          p {
            font-size: 20px;
          }
        }

        @media only screen and (min-width: ${theme.sizes.tablet}) {
          .front-page {
            padding: 100px;
          }
          .button-container {
            margin-top: 60px;
            width: 70%;
          }
          .utensils-container {
            font-size: 30px;
          }
          h1 {
            font-size: 104px;
          }
          h3 {
            font-size: 40px;
          }
          p {
            max-width: 900px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Index;
