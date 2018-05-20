import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format'
import './styles/SearchEmp.css';
import ListData from './ListData';
import { database } from '../configs/firebase';
import { I18n } from 'react-i18next'
import Popup from './Popup'
import { isNumber } from 'util';

class SearchEmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EmpNo: '',
      EmpName: '',
      EmpSureName: '',
      Salary: '',
      Department: 'AllDepartment',
      data: {},
      fullData: {},
      disabledSearch: true,
      validation: {
        EmpNo: true,
        EmpNoLen: true,
        Salary: true
      }
    };
    this.handleChangeEmpNo = this.handleChangeEmpNo.bind(this);
    this.handleChangeEmpName = this.handleChangeEmpName.bind(this);
    this.handleChangeEmpSureName = this.handleChangeEmpSureName.bind(this);
    this.handleChangeSalary = this.handleChangeSalary.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
  }

  onClickClear() {
    this.setState((prevState) => ({
      EmpNo: '',
      EmpName: '',
      EmpSureName: '',
      Salary: '',
      Department: 'AllDepartment',
      data: prevState.fullData,
      disabledSearch: true,
      validation: {
        EmpNo: true,
        EmpNoLen: true,
        Salary: true
      }
    }))
  }

  onClickSearch = () => {
    const {EmpNo,EmpName,EmpSureName,Salary,Department,data} = this.state
    const dataQ = {}
    Object.keys(data).filter(key => (
        this.searching(EmpNo, data[key].EmpNo) &&
        this.searching(EmpName, data[key].EmpName) &&
        this.searching(EmpSureName, data[key].EmpSureName) &&
        this.searching(Salary, data[key].Salary) &&
        (Department === 'AllDepartment' || Department === data[key].Department)
      )).forEach(key => {
        dataQ[key] = data[key]
      })
    this.setState({data: dataQ})
  }

  searching = (pattern = '', text = '') => {
    console.log('///////////////////////////////////////////////////////////////////////////////')
    console.log('pattern', pattern)
    console.log('text', text)
    if (pattern === '') {
      console.log('true')
      return true
    }
    else if (pattern.length > text.length) {
      return false
    } else {
      for (let i = 0; i + pattern.length <= text.length; i++) {
        console.log(['text', i].join('-'), text.substr(i + 0, pattern.length))
        if (pattern === text.substr(i + 0, pattern.length)) {
          console.log('true')
          return true
        }
      }
      console.log('false')
      return false
    }
  }

  isDisabledSearch = () => (
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
    }, () => this.setState({ disabledSearch: byPass ? true : this.isDisabledSearch() }))
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

  componentWillMount = () => {
    var dbList = database.ref('employee');
    dbList.on('value', snapshot => {
      const result = snapshot.val()
      const data = {}
      if (result !== null) {
        Object.keys(result).forEach((key, index) => {
          data[index + 1] = result[key]
          data[index + 1].key = key
        })
        this.setState({ data, fullData: data })
      } else {
        this.setState({ data: {}, fullData: {} })
      }
    });
  }

  //ฟังก์ชั่นเอาไว้ Update น่ะจ๊ะ
  onClickEdit = (index, dataItem) => {
    const { data } = this.state
    data[index] = dataItem
    this.setState({ data })
    const dataForFirebase = {}
    Object.keys(dataItem).filter(id => id !== 'key').forEach(id => {
      dataForFirebase[id] = dataItem[id]
    })
    console.log(dataForFirebase)
    database.ref('employee').child(dataItem.key).set(dataForFirebase)
  }

  render() {
    const { lng } = this.props
    return (
      <div style={{
        // alignItems: 'center',
        // backgroundColor: 'red',
      }}>
        <div className='bodyAP'>
          <I18n>
            {(t) => (
              <fieldset className='formSearch' >
                <legend className='headerSearch' > {t('searchEmpCritieria.title', { lng })}  </legend>
                <div className='bodyInTheBody' >
                  <div className='leftBody'>
                    <TextField
                      className='textField'
                      // hintText="Employee No."
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
                      className='textField'
                      // hintText="Hint Text"
                      // errorText=""
                      label={t('formManageUser.employeeName', { lng })}
                      value={this.state.EmpName}
                      onChange={this.handleChangeEmpName}
                    />
                    <TextField
                      className='textField'
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
                    <Button variant="raised" disabled={this.state.disabledSearch} style={{ backgroundColor: this.state.disabledSearch ? '#e5e5e5' : '#0978ad', color: 'white', fontWeight: '600' }} className={'button'} onClick={() => this.onClickSearch()} >
                      {t('formManageUser.button.search', { lng })}
                    </Button>
                    {/* <button className='btnSearch' onClick={() => this.onClickSearch()}>
                  SEARCH
            </button> */}
                  </div>
                  <div className='rightBody'>
                    <div className='textField' />
                    <TextField
                      className='textField'
                      // hintText="Employee No."
                      // errorText="This field is required"
                      label={t('formManageUser.employeeSurename', { lng })}
                      value={this.state.EmpSureName}
                      onChange={this.handleChangeEmpSureName}
                    />
                    <TextField
                      className='textField'
                      // hintText="Hint Text"
                      error={!this.state.validation.Salary}
                      helperText={this.state.validation.Salary ? '' : t('searchEmp.validation.salary', { lng })}
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
              </fieldset >
            )}
          </I18n>
        </div>
        <div className='botSearch' >
          <ListData onClickEdit={this.onClickEdit} data={this.state.data} popup={this.popup} lng={lng} />
        </div>
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

SearchEmp.propTypes = {
  lnt: PropTypes.oneOf(['en', 'th']),
};

SearchEmp.defaultProps = {
  lnt: 'en',
};

export default SearchEmp;

const styles = {
  errorStyle: {
    color: 'red',
  },
  underlineStyle: {
    borderColor: 'blue',
  },
  floatingLabelStyle: {
    color: 'yellow',
  },
  floatingLabelFocusStyle: {
    color: 'blue',
  },
};