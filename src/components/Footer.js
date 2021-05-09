import React from 'react';
import Modal from 'react-modal';
import privacyStatement from '../data/privacyStatement';

const customStyles = {
  content: {
    top: '5%',
    left: '0',
    right: '0',
    bottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    height: '500px',
    overflowY: 'scroll',
  },
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    document.querySelector('body').style.overflow = 'hidden';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    document.querySelector('body').style.overflow = 'auto';
  }

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div>
            <img
              src="footer-logo-govt.png"
              srcSet="footer-logo-govt@2x.png 2x,footer-logo-govt.png 1x"
              width="240"
              height="46"
              alt="New Zealand Government"
            />
            <p>Alpha</p>
            <span id="privacy" onClick={this.openModal} className="link">
              Privacy Statement
            </span>
            {this.state.modalIsOpen && (
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <button
                  onClick={this.closeModal}
                  style={{ float: 'right', margin: '0 0 20px 0' }}
                >
                  close
                </button>
                <div
                  dangerouslySetInnerHTML={{
                    __html: privacyStatement.content.en.text,
                  }}
                />
              </Modal>
            )}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
