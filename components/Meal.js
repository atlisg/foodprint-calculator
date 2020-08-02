import React, { Fragment } from 'react';
import Router from 'next/router';
import Tooltip from '@material-ui/core/Tooltip';
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaQrcode } from 'react-icons/fa';
import classNames from 'classnames';
import QRCode from 'qrcode.react';
import { userTypeMap } from '../utils/constants';
import Card from './Card';
import CardTitle from './CardTitle';
import ExternalLink from './ExternalLink';
import AboutMeal from './AboutMeal';
import Pies from './Pies';
import Separator from './Separator';
import MealLink from './MealLink';
import theme from '../styles/theme';

const Meal = ({ meal, showEyeButton, allMeals, showFooterButtons, deleteMeal, isIndividual }) => {
  const userSubtitle = `${meal?.user?.name || ''}${
    meal?.user?.type && meal?.user?.type !== 'other' ? `, ${userTypeMap[meal?.user?.type]}` : ''
  }`;

  const changeVisibility = (meal) => {
    meal.visibility = meal.visibility === 'private' ? 'public' : 'private';
    fetch('api/meals', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mealId: meal._id, meal }),
    });

    Router.push('/mymeals');
  };

  const downloadQRCode = (meal) => {
    const elem = document.getElementById(`qr-${meal._id}`);
    const canvas = elem.children[0];
    const dataURL = canvas.toDataURL();
    const title = meal.title || mealTitle || 'Meal';
    let link = document.createElement('a');
    link.download = `${title
      .toLowerCase()
      .replace(/([^a-z0-9 ]+)/g, '') // Remove illegal filename characters
      .replace(/ /g, '-')}-qr-code.png`;
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="meal" id={meal._id}>
      <Card>
        <div className="title-container">
          <CardTitle>
            {isIndividual ? meal.title : <MealLink id={meal._id}>{meal.title}</MealLink>}
          </CardTitle>
          {showEyeButton && (
            <Tooltip
              title={meal.visibility === 'public' ? 'Make private' : 'Publish meal'}
              placement="left"
              arrow
            >
              <button
                className={classNames('visibility-button', {
                  'visibility-button-public': meal.visibility === 'public',
                })}
                onClick={() => changeVisibility(meal)}
              >
                {meal.visibility === 'public' ? <FaEye /> : <FaEyeSlash />}
              </button>
            </Tooltip>
          )}
        </div>
        <div className="subtitle">
          {meal.user?.homepage ? (
            <ExternalLink href={meal.user.homepage}>{userSubtitle}</ExternalLink>
          ) : (
            userSubtitle
          )}
        </div>
        <p className="servings">{`Serves ${meal.numberOfServings} ${
          meal.numberOfServings === 1 ? 'person' : 'people'
        }`}</p>
        {meal.about && <AboutMeal text={meal.about} isIndividual={isIndividual} />}
        {meal.link && <ExternalLink href={meal.link}>Link to recipe </ExternalLink>}
        <Pies
          meal={meal}
          numberOfServings={meal.numberOfServings}
          allMeals={allMeals}
          isIndividual={isIndividual}
        />
        {showFooterButtons && (
          <Fragment>
            <Separator />
            <div className="footer-button-container">
              <Tooltip title="Delete meal" placement="right" arrow>
                <button className="delete-button" onClick={() => deleteMeal(meal)}>
                  <FaTrash />
                </button>
              </Tooltip>
              <div className="right-footer">
                <Tooltip title="Download QR code" placement="left" arrow>
                  <button className="download-button" onClick={() => downloadQRCode(meal)}>
                    <FaQrcode />
                    <span id={`qr-${meal._id}`} className="qr-code">
                      <QRCode value={`https://foodprintcalculator.com/meals/${meal._id}`} />
                    </span>
                  </button>
                </Tooltip>
                <Tooltip title="Edit meal" placement="top" arrow>
                  <div className="edit-button-container">
                    <MealLink id={meal._id} isEdit>
                      <FaEdit />
                    </MealLink>
                  </div>
                </Tooltip>
              </div>
            </div>
          </Fragment>
        )}
      </Card>

      <style jsx>{`
        .title-container {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .servings {
          font-size: 14px;
        }
        .meal {
          width: ${isIndividual ? '100%' : '600px'};
          margin: ${isIndividual ? '120px 0 0' : '0'};
          padding-bottom: 20px;
          font-size: 18px;
        }
        .edit-button-container {
          color: ${theme.colors.water};
          font-size: 22px;
        }
        .delete-button,
        .visibility-button {
          display: flex;
          align-items: center;
          padding: 0;
          font-size: 22px;
          color: ${theme.colors.eutro};
          background-color: #fff;
          opacity: 1;
          transition: opacity 0.2s;
          cursor: pointer;
          border-radius: 4px;
          border: none;
          outline: none;
        }
        .delete-button:hover,
        .visibility-button:hover {
          opacity: 0.7;
        }
        .footer-button-container {
          display: flex;
          justify-content: space-between;
        }
        .visibility-button {
          font-size: 28px;
          color: #777;
        }
        .visibility-button-public {
          color: ${theme.colors.land};
        }
        .download-button {
          display: flex;
          align-items: center;
          margin: 0 20px;
          padding: 0;
          font-size: 22px;
          color: ${theme.colors.text};
          background-color: #fff;
          opacity: 1;
          transition: opacity 0.2s;
          cursor: pointer;
          border: none;
          outline: none;
        }
        .download-button:hover {
          opacity: 0.7;
        }
        .right-footer {
          display: flex;
        }
        .qr-code {
          display: none;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .meal {
            margin: ${isIndividual ? '120px 0 0' : '0 20px'};
          }
          .servings {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Meal;