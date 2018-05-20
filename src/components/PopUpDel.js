import React from 'react';
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format'
import Button from '@material-ui/core/Button'
import { I18n } from 'react-i18next'
import { database } from '../configs/firebase'
import './styles/Popup.css' 

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class PopUpDel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }

    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { onClickDelete, lng } = this.props
        console.log('pop up del')
        return (
            <div>
                <svg viewBox="0 0 24 24" style={{ height: 50, width: 50 }} onClick={this.handleOpen} >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>
                </svg>
                <Dialog
                    // title="Edit"
                    // actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <I18n>
                        {(t) => (
                            <div className={'popUpContainerDel'} >
                                <div className={'popUpHeader'} >
                                    <p id={'popUpHeader'} >{t('popUp.title', { lng })}</p>
                                    <p id={'popUpHeader'} onClick={() => { this.handleClose() }} >X</p>
                                </div>
                                <div className={'popUpCenterDel'} >
                                    <p>Do you want to delete the data?</p>
                                </div>
                                <div className={'popUpBot'} >
                                    <Button variant="raised" className={'popUpButton'} style={{ backgroundColor: '#d9534f', color: 'white', fontWeight: 600 }} onClick={() => { onClickDelete(); this.handleClose() }} > {t('formManageUser.button.ok', { lng })} </Button>
                                    <Button variant="raised" className={'popUpButton'} style={{ backgroundColor: 'white', fontWeight: 600, marginLeft: 20 }} onClick={() => { this.handleClose() }} > {t('formManageUser.button.cacel', { lng })} </Button>
                                </div>
                            </div>
                        )}
                    </I18n>
                </Dialog>
            </div>
        );
    }
}
