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
export default class DialogExampleSimple extends React.Component {
    constructor(props) {
        super(props)
        const { EmpNo, EmpName, EmpSureName, Department, Salary } = this.props.data
        const validation = {}
        if (isNaN(parseInt(EmpNo, 10)) && EmpNo !== '') {
            validation['EmpNo'] = false
        } else {
            validation['EmpNo'] = true
        }
        if (EmpNo.length > 8) {
            validation['EmpNoLen'] = false
        } else {
            validation['EmpNoLen'] = true
        }
        if (Salary.length > 8) {
            validation['Salary'] = false
        } else {
            validation['Salary'] = true
        }
        this.state = {
            open: false,
            okButtonEnabled: false,
            EmpNo,
            EmpName,
            EmpSureName,
            Salary,
            Department,
            oldData: {},
            disableOk: true,
            validation
            // EmpNo,
            // EmpName,
            // EmpSureName,
            // Salary,
            // Department,
            // oldEmpNo = EmpNo,
            // oldEmpName = EmpName,
            // oldEmpSureName =  EmpSureName,
            // oldSalary = Salary,
            // oldDepartment = Department
        }

    }

    componentDidMount = () => {
        const { keyData } = this.props
        database.ref('employee').once('value', snapshot => {
            const result = snapshot.val()
            const oldData = result[Object.keys(result).find(key => key === keyData)]
            this.setState({ oldData })
        });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    isSame = () => (
        this.state.EmpNo === this.state.oldData.EmpNo &&
        this.state.EmpName === this.state.oldData.EmpName &&
        this.state.EmpSureName === this.state.oldData.EmpSureName &&
        this.state.Department === this.state.oldData.Department &&
        this.state.Salary === this.state.oldData.Salary
    )


    // handleChangeEmpNo = (event) => {
    //     const { data } = this.state
    //     data['EmpNo'] = event.target.value
    //     this.setState({ data })
    //     this.isSame()
    // }
    // handleChangeEmpName = (event) => {
    //     const { data } = this.state
    //     data['EmpName'] = event.target.value
    //     this.setState({ data });
    //     this.isSame()
    // }
    // handleChangeEmpSureName = (event) => {
    //     const { data } = this.state
    //     data['EmpSureName'] = event.target.value
    //     this.setState({ data });
    //     this.isSame()
    // }
    // handleChangeSalary = (event) => {
    //     const { data } = this.state
    //     data['Salary'] = event.target.value
    //     this.setState({ data });
    //     this.isSame()
    // }
    // handleChangeSelect = (event) => {
    //     const { data } = this.state
    //     data['Department'] = event.target.value
    //     this.setState({ data });
    //     this.isSame()
    // } 

    isDisabledOK = () => (
        this.state.EmpNo === '' &&
        this.state.EmpName === '' &&
        this.state.EmpSureName === '' &&
        this.state.Salary === '' &&
        this.state.Department === 'AllDepartment'
    )

    checkValidation = () => {
        const { validation, EmpNo, Salary } = this.state
        let byPass = false
        if (this.isNum(EmpNo) && EmpNo !== '') {
            validation['EmpNo'] = false
            byPass = true
        } else {
            validation['EmpNo'] = true
        }
        if (EmpNo.length > 8) {
            validation['EmpNoLen'] = false
            byPass = true
        } else {
            validation['EmpNoLen'] = true
        }
        if (Salary.length > 8) {
            validation['Salary'] = false
            byPass = true
        } else {
            validation['Salary'] = true
        }
        console.log(byPass, this.isDisabledOK(), this.isSame())
        this.setState({
            validation,
        }, () => this.setState({ disableOk: byPass ? true : this.isDisabledOK() || this.isSame() }))
    }

    isNum = (text = '') => (
        text.split('').map(t => isNaN(parseInt(t, 10))).find(b => b === true)
    )

    handleChangeEmpNo = (event) => {
        this.setState({
            EmpNo: event.target.value
        }, () => this.checkValidation())
    }
    handleChangeEmpName = (event) => {
        this.setState({
            EmpName: event.target.value,
        }, () => this.checkValidation());
    }
    handleChangeEmpSureName = (event) => {
        this.setState({
            EmpSureName: event.target.value,
        }, () => this.checkValidation());
    }
    handleChangeSalary = (event) => {
        this.setState({
            Salary: event.target.value,
        }, () => this.checkValidation())
    }
    handleChangeSelect = (event) => {
        this.setState({
            Department: event.target.value
        }, () => this.checkValidation());
    }

    // clickOkButton = () => {
    //     this.setState((prevState) => ({ okButtonEnabled: !prevState.okButtonEnabled }))
    //     console.log(this.state.okButtonEnabled)
    // }

    render() {
        // const actions = [
        //     <RaisedButton
        //         label="Cancel"
        //         primary={true}
        //         onClick={this.handleClose}
        //     />,
        //     <RaisedButton
        //         label="Submit"
        //         primary={true}
        //         keyboardFocused={true}
        //         onClick={this.handleClose}
        //     />,
        // ];
        const { index, lng, onClickEdit, keyData } = this.props
        const { EmpNo, EmpName, EmpSureName, Department, Salary, disableOk } = this.state
        return (
            <div>
                <svg viewBox="0 0 24 24" style={{ height: 50, width: 50 }} onClick={this.handleOpen} >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
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
                            <div className={'popUpContainer'} >
                                <div className={'popUpHeader'} >
                                    <p id={'popUpHeader'} >{t('popUp.title', { lng })}</p>
                                    <p id={'popUpHeader'} onClick={() => { this.handleClose() }} >X</p>
                                </div>
                                <div className={'popUpCenter'} >
                                    <div className='leftBody'>
                                        <TextField
                                            className='textFieldPopUp'
                                            // hintText="Employee No."
                                            // errorText="This field is required" 
                                            error={!this.state.validation.EmpNo || !this.state.validation.EmpNoLen}
                                            helperText={this.state.validation.EmpNo ? this.state.validation.EmpNoLen ? '' : t('searchEmp.validation.salary', { lng }) : t('searchEmp.validation.empno', { lng })}
                                            label={t('formManageUser.employeeNo', { lng })}
                                            // placeholder="Placeholder"
                                            // underlineFocusStyle={styles.underlineStyle}
                                            // floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            value={this.state.EmpNo}
                                            onChange={this.handleChangeEmpNo}
                                        />
                                        <TextField
                                            className='textFieldPopUp'
                                            // hintText="Hint Text"
                                            // errorText=""
                                            label={t('formManageUser.employeeName', { lng })}
                                            value={this.state.EmpName}
                                            onChange={this.handleChangeEmpName}
                                        />
                                        <TextField
                                            className='textFieldPopUp'
                                            select
                                            // hintText="Hint Text"
                                            // errorText=""
                                            label={t('formManageUser.department.title', { lng })}
                                            onChange={this.handleChangeSelect}
                                            value={this.state.Department ? this.state.Department : 'AllDepartment'}
                                            SelectProps={{
                                                native: true,
                                                MenuProps: {
                                                    // className: classes.menu,
                                                },
                                            }}
                                        >
                                            <option value="AllDepartment">{t('formManageUser.department.AllDepartment', { lng })}</option>
                                            <option value="IT">{t('formManageUser.department.IT', { lng })}</option>
                                            <option value="HR">{t('formManageUser.department.HR', { lng })}</option>
                                            <option value="Marketing">{t('formManageUser.department.Marketing', { lng })}</option>
                                        </TextField>
                                    </div>
                                    <div className='rightBody'>
                                        <div className='textFieldPopUp' />
                                        <TextField
                                            className='textFieldPopUp'
                                            // hintText="Employee No."
                                            // errorText="This field is required"
                                            label={t('formManageUser.employeeSurename', { lng })}
                                            value={this.state.EmpSureName}
                                            onChange={this.handleChangeEmpSureName}
                                        />
                                        <TextField
                                            className='textFieldPopUp'
                                            // hintText="Hint Text"
                                            // errorText=""
                                            error={!this.state.validation.Salary}
                                            helperText={this.state.validation.Salary ? '' : t('searchEmp.validation.salary', { lng })}
                                            label={t('formManageUser.salary', { lng })}
                                            value={this.state.Salary}
                                            onChange={this.handleChangeSalary}
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                        />
                                    </div>

                                </div>
                                <div className={'popUpBot'} >
                                    <Button variant="raised" className={'popUpButton'} style={{ backgroundColor: disableOk ? '#e5e5e5' : '#449d44', color: 'white', fontWeight: 600 }} disabled={disableOk} onClick={() => { onClickEdit(index, { EmpNo, EmpName, EmpSureName, Department, Salary, key: keyData }); this.handleClose() }} > {t('formManageUser.button.ok', { lng })} </Button>
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

const NumberFormatCustom = (props) => {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            ref={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix="$"
        />
    );
}

                    // import React from "react";
                    // // import Warper from "./Warper";
                    // import Popup from "reactjs-popup";
                    // //

// const contentStyle = {
//     maxWidth: "600px",
//     width: "90%"
// };

// export default class Custompopup extends React.Component {
//     render() {
//         return (
//             <Popup
//                 trigger={
//                     <svg viewBox="0 0 24 24" style={{ height: 50, width: 50 }} onClick={() => { }}>
//                         <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
//                     </svg>
//                 }
//                 modal
//                 contentStyle={contentStyle}
//             >
//                 {close => (
//                     <div className="modal">
//                         <a className="close" onClick={close}>
//                             &times;
//         </a>
//                         <div className="header"> Modal Title </div>
//                         <div className="content">
//                             {" "}
//                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
//                             nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
//                             quibusdam voluptates delectus doloremque, explicabo tempore dicta
//                             adipisci fugit amet dignissimos?
//           <br />
//                             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
//                             sit commodi beatae optio voluptatum sed eius cumque, delectus saepe
//                             repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem
//                             alias. Vitae?
//         </div>
//                         <div className="actions">
//                             <Popup
//                                 trigger={<button className="button"> Menu Demo </button>}
//                                 position="top center"
//                                 closeOnDocumentClick
//                                 contentStyle={{ padding: "0px", border: "none" }}
//                             >
//                                 <div className="menu">
//                                     <div className="menu-item"> Menu item 1</div>
//                                     <div className="menu-item"> Menu item 2</div>
//                                     <div className="menu-item"> Menu item 3</div>
//                                     <Popup
//                                         trigger={<div className="menu-item"> sup Menu </div>}
//                                         position="right top"
//                                         on="hover"
//                                         closeOnDocumentClick
//                                         mouseLeaveDelay={300}
//                                         mouseEnterDelay={0}
//                                         contentStyle={{ padding: "0px", border: "none" }}
//                                         arrow={false}
//                                     >
//                                         <div className="menu">
//                                             <div className="menu-item"> item 1</div>
//                                             <div className="menu-item"> item 2</div>
//                                             <div className="menu-item"> item 3</div>
//                                         </div>
//                                     </Popup>
//                                     <div className="menu-item"> Menu item 4</div>
//                                 </div>
//                             </Popup>
//                             <button
//                                 className="button"
//                                 onClick={() => {
//                                     console.log("modal closed ");
//                                     close();
//                                 }}
//                             >
//                                 close modal
//           </button>
//                         </div>
//                     </div>
//                 )}
//             </Popup>
//         )
//     }
// }
