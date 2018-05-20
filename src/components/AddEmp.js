import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format'
import Paper from '@material-ui/core/Paper';
import { I18n } from 'react-i18next'
import './styles/AddEmp.css';
import { database } from '../configs/firebase';

class AddEmp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      EmpNo: '',
      EmpName: '',
      EmpSureName: '',
      Salary: '',
      Department: 'AllDepartment',
      disabledAdd: true,
      validation: {
        EmpNo: true,
        EmpNoLen: true,
        Salary: true
      },
      validationNull: {
        EmpNo: true,
        EmpName: true,
        EmpSureName: true,
        Salary: true,
        Department: true
      }
    };
    this.handleChangeEmpNo = this.handleChangeEmpNo.bind(this);
    this.handleChangeEmpName = this.handleChangeEmpName.bind(this);
    this.handleChangeEmpSureName = this.handleChangeEmpSureName.bind(this);
    this.handleChangeSalary = this.handleChangeSalary.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
    // this.onClickup = this.onClickup.bind(this);
  }

  onClickClear() {
    this.setState({
      EmpNo: '',
      EmpName: '',
      EmpSureName: '',
      Salary: '',
      Department: 'AllDepartment',
      disabledAdd: true,
      validation: {
        EmpNo: true,
        EmpNoLen: true,
        Salary: true
      },
      validationNull: {
        EmpNo: true,
        EmpName: true,
        EmpSureName: true,
        Salary: true,
        Department: true
      }
    })
  }

  isDisabledAdd = () => (
    this.state.EmpNo === '' &&
    this.state.EmpName === '' &&
    this.state.EmpSureName === '' &&
    this.state.Salary === '' &&
    this.state.Department === 'AllDepartment'
  )

  isNum = (text = '') => (
    text.split('').map(t => isNaN(parseInt(t, 10))).find(b => b === true)
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
    this.setState({
      validation,
    }, () => this.setState({ disabledAdd: byPass ? true : this.isDisabledAdd() }))
  }
  
  handleChangeEmpNo = (event) => {
    this.setState({
      EmpNo: event.target.value
    }, () => this.checkValidation())
  }
  handleChangeEmpName(event) {
    this.setState({
      EmpName: event.target.value,
    }, () => this.checkValidation());
  }
  handleChangeEmpSureName(event) {
    this.setState({
      EmpSureName: event.target.value,
    }, () => this.checkValidation());
  }
  handleChangeSalary(event) {
    this.setState({
      Salary: event.target.value,
    }, () => this.checkValidation())
  }
  handleChangeSelect(event) {
    this.setState({
      Department: event.target.value
    }, () => this.checkValidation());
  }


  onClickAdd = () => {
    const { validation, validationNull, EmpNo, EmpName, EmpSureName, Salary, Department } = this.state
    // validation['allNull'] =
    //   EmpNo !== '' &&
    //   EmpName !== '' &&
    //   EmpSureName !== '' &&
    //   Salary !== '' &&
    //   Department !== 'AllDepartment'
    // console.log(validation) 
    let check = true
    if (EmpNo === '') {
      validationNull['EmpNo'] = false
      check = false
    } else {
      validationNull['EmpNo'] = true
    }
    if (EmpName === '') {
      validationNull['EmpName'] = false
      check = false
    } else {
      validationNull['EmpName'] = true
    }
    if (EmpSureName === '') {
      validationNull['EmpSureName'] = false
      check = false
    } else {
      validationNull['EmpSureName'] = true
    }
    if (Salary === '') {
      validationNull['Salary'] = false
      check = false
    } else {
      validationNull['Salary'] = true
    }
    if (Department === 'AllDepartment') {
      validationNull['Department'] = false
      check = false
    } else {
      validationNull['Department'] = true
    }
    if (check) {
      database.ref('employee').push({
        EmpNo: EmpNo,
        EmpName: EmpName,
        EmpSureName: EmpSureName,
        Salary: parseInt(Salary, 10),
        Department: Department,
      });
      this.props.history.replace('/')
    }
    this.setState({ validationNull })
  }

  // onClickup() {
  //   let { EmpNo, EmpName, EmpSureName, Salary, Department } = this.state;
  //   if (EmpNo !== '' && EmpName !== '' && EmpSureName !== '' && Salary !== '' && Department !== '') {
  //     if (!isNaN(parseInt(Salary, 10))) {
  //       let dbCon = database.ref('employee');
  //       dbCon.push({
  //         EmpNo: EmpNo,
  //         EmpName: EmpName,
  //         EmpSureName: EmpSureName,
  //         Salary: parseInt(Salary, 10),
  //         Department: Department,
  //       });
  //       this.onClickClear();
  //     } else {
  //       alert('ข้อผิดพลาด กรุณาระบุข้อมูลให้ถูกต้อง :( ');
  //     }
  //   } else {
  //     alert('ข้อผิดพลาด กรุณาระบุข้อมูลให้ครบถ้วน :( ');
  //   }
  // }

  render() {
    const { lng } = this.props
    return (
      <div>
        <div style={{
          alignItems: 'center',
        }}>
          <Paper className='paper' elevation={2} >
            <I18n>
              {(t) => (
                <div className='bodyInTheBody' >
                  <div className='leftBody'>
                    <TextField
                      required
                      className='textField'
                      // hintText="Employee No."
                      // errorText="This field is required" 
                      error={!this.state.validation.EmpNo || !this.state.validationNull.EmpNo}
                      helperText={this.state.validationNull.EmpNo ? this.state.validation.EmpNo ? '' : t('addEmp.validation.empno', { lng }) : t('addEmp.validation.required', { lng })}
                      label={t('formManageUser.employeeNo', { lng })}
                      // placeholder="Placeholder"
                      // underlineFocusStyle={styles.underlineStyle}
                      // floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                      value={this.state.EmpNo}
                      onChange={this.handleChangeEmpNo}
                    />
                    <TextField
                      required
                      className='textField'
                      // hintText="Hint Text"
                      // errorText=""
                      error={!this.state.validationNull.EmpName}
                      helperText={this.state.validationNull.EmpName ? '' : t('addEmp.validation.required', { lng })}
                      label={t('formManageUser.employeeName', { lng })}
                      value={this.state.EmpName}
                      onChange={this.handleChangeEmpName}
                    />
                    <TextField
                      className='textField'
                      select
                      // hintText="Hint Text"
                      // errorText=""
                      error={!this.state.validationNull.Department}
                      helperText={this.state.validationNull.Department ? '' : t('addEmp.validation.required', { lng })}
                      label={t('formManageUser.department.title')}
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

                    {/* <input className='EmpNo'
                value={this.state.EmpNo}
                onChange={this.handleChangeEmpNo}
                placeholder='Employee No.'
              />
              <input className='EmpName'
                value={this.state.EmpName}
                onChange={this.handleChangeEmpName}
                placeholder='Employee Name'
              /> */}
                    {/* <div>
                  <select value={this.state.Department ? this.state.Department : ''} name="department" aria-invalid="false" aria-required="false" id="form-department" onChange={this.handleChangeSelect}>
                    <option value="AllDepartment">All Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                  </select> */}
                    {/* <svg class="jss33 jss32" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 10l5 5 5-5z"></path></svg> */}
                    {/* </div> */}
                    <Button variant="raised" style={{ backgroundColor: this.state.disabledAdd ? '#e5e5e5' : '#0978ad', color: 'white', fontWeight: '600' }} disabled={this.state.disabledAdd} className={'button'} onClick={() => { this.onClickAdd() }} >
                      {t('formManageUser.button.add', { lng })}
                    </Button>
                    {/* <button className='btnSearch' onClick={() => this.onClickSearch()}>
                  SEARCH
            </button> */}
                  </div>
                  <div className='rightBody'>
                    <div className='textField' />
                    <TextField
                      required
                      className='textField'
                      // hintText="Employee No."
                      // errorText="This field is required"
                      error={!this.state.validationNull.EmpSureName}
                      helperText={this.state.validationNull.EmpSureName ? '' : t('addEmp.validation.required', { lng })}
                      label={t('formManageUser.employeeSurename')}
                      value={this.state.EmpSureName}
                      onChange={this.handleChangeEmpSureName}
                    />
                    <TextField
                      required
                      className='textField'
                      // hintText="Hint Text"
                      // errorText=""
                      error={!this.state.validation.Salary || !this.state.validationNull.Salary}
                      helperText={this.state.validationNull.Salary ? this.state.validation.Salary ? '' : t('addEmp.validation.salary', { lng }) : t('addEmp.validation.required', { lng })}
                      label={t('formManageUser.salary', { lng })}
                      value={this.state.Salary}
                      onChange={this.handleChangeSalary}
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                    />
                    {/* <input className='EmpSureName'
                  value={this.state.EmpSureName}
                  onChange={this.handleChangeEmpSureName}
                  placeholder='Employee Surename'
                />
                <input className='Salary'
                  value={this.state.Salary}
                  onChange={this.handleChangeSalary}
                  placeholder='Salary'
                /> */}

                    <Button variant="raised" style={{ backgroundColor: '#d9534f', color: 'white', fontWeight: '600' }} className={'button'} onClick={() => this.onClickClear()} >
                      {t('formManageUser.button.clear', { lng })}
                    </Button>
                    {/* <button className='btnClear' onClick={() => this.onClickClear()}>
                  CLEAR
            </button> */}

                  </div>
                </div>
              )}
            </I18n>
          </Paper >
        </div>
      </div>
    );
  }
}

AddEmp.propTypes = {
  lnt: PropTypes.oneOf(['en', 'th']),
};

AddEmp.defaultProps = {
  lnt: 'en',
};

export default AddEmp;

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