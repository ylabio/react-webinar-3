import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import PageLayout from "../page-layout"
import Head from "../head"
import './style.css';
import { createPortal } from "react-dom";

function ModalLayout({ title, closeModal, children }) {

  const cn = bem('ModalLayout');
  const portal = document.getElementById('portal')

  return createPortal(
    <div className={cn()}>
      <div className={cn('block')}>
        <PageLayout>
          <Head title={title} >
            <div className="Head-btn">
              <button onClick={closeModal}>Закрыть</button>
            </div>
          </Head>
          {children}
        </PageLayout>

      </div>
    </div>
    , portal)
}

ModalLayout.propTypes = {
  children: PropTypes.node
}

export default React.memo(ModalLayout);
