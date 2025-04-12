import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ArticleCard(props) {
  const { article, onAdd = () => {}, t = text => text } = props;
  const cn = bem('ArticleCard');

  return (
    <div className={cn()}>
      {article.profile ? (
        // Отображение профиля пользователя
        <div className={cn('prop-wrapper')}>
          <div className={cn('prop')}>
            <div className={cn('label')}>{t('profile.name')}:</div>
            <div className={cn('value')}>{article.profile.name}</div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>{t('profile.phone')}:</div>
            <div className={cn('value')}>{article.profile.phone}</div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>{t('profile.email')}:</div>
            <div className={cn('value')}>{article.profile.email}</div>
          </div>
        </div>
      ) : (
        // Оригинальное отображение карточки товара
        <>
          <div className={cn('description')}>{article.description}</div>
          <div className={cn('prop-wrapper')}>
            <div className={cn('prop')}>
              <div className={cn('label')}>Страна производитель:</div>
              <div className={cn('value')}>
                {article.madeIn?.title} ({article.madeIn?.code})
              </div>
            </div>
            <div className={cn('prop')}>
              <div className={cn('label')}>Категория:</div>
              <div className={cn('value')}>{article.category?.title}</div>
            </div>
            <div className={cn('prop')}>
              <div className={cn('label')}>Год выпуска:</div>
              <div className={cn('value')}>{article.edition}</div>
            </div>
          </div>
          <div className={cn('prop', { size: 'big' })}>
            <div className={cn('label')}>Цена:</div>
            <div className={cn('value')}>{numberFormat(article.price)} ₽</div>
          </div>
          {onAdd && (
            <Button 
              style="primary" 
              onClick={() => onAdd(article._id)} 
              title={t('article.add')} 
            />
          )}
        </>
      )}
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string
    })
  }).isRequired,
  onAdd: PropTypes.func,
  t: PropTypes.func,
};

export default memo(ArticleCard);
