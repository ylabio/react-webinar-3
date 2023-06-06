import { memo } from "react";
import PropTypes from 'prop-types';
import Flex from "../flex";
import './style.css';

function ProfileCard(props) {
  return (
    <Flex direction="column" gap={20}>
      <>
        <h2>{props.t("profile")}</h2>
        <span>
        {props.t("name")}: <b>{props.profile?.profile?.name}</b>
        </span>
        <span>
        {props.t("phone")}: <b>{props.profile?.profile?.phone}</b>
        </span>
        <span>
        email: <b>{props.profile?.email}</b>
        </span>
      </>
    </Flex>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.object,
  t: PropTypes.func
}

ProfileCard.defaultProps = {
  t: () => {},
}


export default memo(ProfileCard);
