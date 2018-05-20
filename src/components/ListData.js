import React from 'react'
import { database } from '../configs/firebase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Popup from './Popup'
import PopUpDel from './PopUpDel'

export default class Import extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        };
        this.onClickDelete = this.onClickDelete.bind(this);
    }


    onClickDelete = (key) => {
        let dbCon = database.ref('employee');
        dbCon.child(key).remove().then(() => {
            console.log('Delete Data Success');
        }).catch((error) => {
            console.log('Delete Data Error');
        });
    }

    //ฟังก์ชั่นเอาไว้ Update น่ะจ๊ะ
    onClickEdit = (key) => {
        // var obj = { }; //เอาไว้ใส่ค่าที่สร้าง Input ของ edit
        // let dbCon = this.props.db.database().ref('employee');
        // dbCon.child(key).update(obj) 
        this.props.popup()
    }

    isSelected = key => this.state.selected === key

    render() {
        const { data, lng, onClickEdit } = this.props
        return (
            <div>
                <Table >
                    <TableHead style={{ backgroundColor: 'black' }} >
                        <TableRow  >
                            <TableCell style={{ color: 'gray', textAlign: 'center' }} >No.</TableCell>
                            <TableCell style={{ color: 'gray', textAlign: 'center' }} >Employee No.</TableCell>
                            <TableCell style={{ color: 'gray', textAlign: 'center' }} >Employee Name</TableCell>
                            <TableCell style={{ color: 'gray', textAlign: 'center' }} >Employee Surename</TableCell>
                            <TableCell style={{ color: 'gray', textAlign: 'center' }} >Department</TableCell>
                            <TableCell style={{ color: 'gray', textAlign: 'center' }} numeric>Saraly</TableCell>
                            <TableCell style={{ color: 'gray', textAlign: 'center' }} ></TableCell>
                            <TableCell style={{ color: 'gray', textAlign: 'center' }} ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(data).map((key) => (
                            <TableRow
                                key={key}
                                onClick={() => this.setState({ selected: key })}
                                selected={this.isSelected(key)}
                            >
                                <TableCell style={{ textAlign: 'center' }} >{key}</TableCell>
                                <TableCell style={{ textAlign: 'center' }} >{data[key].EmpNo}</TableCell>
                                <TableCell style={{ textAlign: 'center' }} >{data[key].EmpName}</TableCell>
                                <TableCell style={{ textAlign: 'center' }} >{data[key].EmpSureName}</TableCell>
                                <TableCell style={{ textAlign: 'center' }} >{data[key].Department}</TableCell>
                                <TableCell style={{ textAlign: 'center' }} numeric>{data[key].Salary}</TableCell>
                                <TableCell style={{ textAlign: 'center' }} ><Popup onClickEdit={onClickEdit} index={key} keyData={data[key].key} data={{ EmpNo: data[key].EmpNo, EmpName: data[key].EmpName, EmpSureName: data[key].EmpSureName, Department: data[key].Department, Salary: data[key].Salary }} lng={lng} /></TableCell>
                                <TableCell style={{ textAlign: 'center' }} ><PopUpDel onClickDelete={() => this.onClickDelete(data[key].key)} lng={lng} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <div style={{ backgroundColor: 'pink' }}>
                    <tr>
                        <th style={{ width: 150 }}>No.</th>
                        <th style={{ width: 150 }}>Employee No.</th>
                        <th style={{ width: 150 }}>Employee Name</th>
                        <th style={{ width: 150 }}>Employee Surename</th>
                        <th style={{ width: 150 }}>Department</th>
                        <th style={{ width: 150 }}>Saraly</th>
                        <th style={{ width: 150 }}></th>
                        <th style={{ width: 150 }}></th>
                    </tr>
                    {
                        Object.keys(data).map((key) => (
                            <div>
                                <tr>
                                    <td style={{ width: 150 }}>{key}</td>
                                    <td style={{ width: 150 }}>{data[key].EmpNo}</td>
                                    <td style={{ width: 150 }}>{data[key].EmpName}</td>
                                    <td style={{ width: 150 }}>{data[key].EmpSureName}</td>
                                    <td style={{ width: 150 }}>{data[key].Department}</td>
                                    <td style={{ width: 150 }}>{data[key].Salary}</td>
                                    <td style={{ width: 150 }}>
                                        <svg viewBox="0 0 24 24" style={{ height: 50, width: 50 }} onClick={() => this.onClickEdit(data[key].key)}>
                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                                        </svg>
                                        <Popup />
                                    </td>
                                    <td>
                                        <svg viewBox="0 0 24 24" style={{ height: 50, width: 50 }} onClick={() => this.onClickDelete(data[key].key)}>
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>
                                        </svg>
                                    </td>
                                </tr>
                            </div>
                        ))
                    }
                </div> */}
            </div>
        );
    }
} 