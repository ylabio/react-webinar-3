import { memo } from 'react';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import ServicePageLayout from '../../components/service-page-layout';
import KeyValueList from '../../components/key-value-list';
import KeyValueItem from '../../components/key-value-item';
import Spinner from '../../components/spinner';

function UserCard() {
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    user: state.profile.profile,
    active: state.profile.waiting,
  }));

  return (
    <Spinner active={select.active}>
      <ServicePageLayout
        head={t('profile.title')}
        padding={'medium'}
        gap={'medium'}
      >
        <KeyValueList>
          <KeyValueItem itemKey={t('profile.name')} value={select.user.name} />
          <KeyValueItem
            itemKey={t('profile.phone')}
            value={select.user.phone}
          />
          <KeyValueItem
            itemKey={t('profile.email')}
            value={select.user.email}
          />
        </KeyValueList>
      </ServicePageLayout>
    </Spinner>
  );
}

UserCard.propTypes = {
  title: PropTypes.string,
};

UserCard.defaultProps = {
  title: 'Title',
};

export default memo(UserCard);
