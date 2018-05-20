import i18next from 'i18next';

i18next
  .init({
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    lng: 'en', // 'en' | 'th'
    // Using simple hardcoded resources for simple example
    resources: {
      en: {
        translation: {
          menu: {
            title: 'Final Exam',
            manageEmp: 'Manage Employee',
            searchEmp: 'Search Employee',
            addEmp: 'Add Employee',
            language: 'Language',
            thai: 'ไทย',
            english: 'English',
          },
          searchEmp: {
            title: 'Search Employee',
            validation: {
              empno: 'must be number',
              salary: 'Max length = 8'
            }
          },
          addEmp: {
            title: 'Add Employee',
            validation: {
              empno: 'must be number',
              salary: 'Max length = 8',
              required: 'This is required'
            }
          },
          searchEmpCritieria: {
            title: 'Critieria',
          },
          popUp : {
            title : 'Edit'
          },
          formManageUser: {
            employeeNo: 'Employee No.',
            employeeName: 'Employee Name',
            employeeSurename: 'Employee Surename',
            department: {
              title: 'Department',
              IT: 'IT',
              HR: 'HR',
              Marketing: 'Marketing',
              AllDepartment: 'All Department',
            },
            salary: 'Salary',
            button: {
              search: 'SEARCH',
              add: 'ADD',
              clear: 'CLEAR',
              ok: 'OK',
              cacel: 'CANCEL'
            }
          },
        },
      },
      th: {
        translation: {
          menu: {
            title: 'ทดสอบครั้งสุดท้ายนะจ๊ะ',
            manageEmp: 'จัดการพนักงาน',
            searchEmp: 'ค้นหาพนักงาน',
            addEmp: 'เพิ่มพนักงาน',
            language: 'Language',
            thai: 'ไทย',
            english: 'English',
          },
          searchEmp: {
            title: 'ค้นหาพนักงาน',
            validation: {
              empno: 'ต้องเป็นตัวเลข',
              salary: 'ความยาวสูงสุดตัวอักษร = 8'
            }
          },
          addEmp: {
            title: 'เพิ่มพนักงาน',
            validation: {
              empno: 'ต้องเป็นตัวเลข',
              salary: 'ความยาวสูงสุดตัวอักษร = 8',
              required: 'ต้องใส่ค่านะจ๊ะ'
            }
          },
          searchEmpCritieria: {
            title: 'ค้นหาข้อมูลพนักงาน',
          },
          popUp : {
            title : 'แก้ไข'
          },
          formManageUser: {
            employeeNo: 'รหัสพนักงาน',
            employeeName: 'ชื่อ',
            employeeSurename: 'นามสกุล',
            department: {
              title: 'แผนก',
              IT: 'ไอที',
              HR: 'จัดการทรัพยากรณ์มนุษย์',
              Marketing: 'การตลาด',
              AllDepartment: 'เลือกทุกแผนก',
            },
            salary: 'เงินเดือน',
            button: {
              search: 'ค้นหา',
              add: 'เพิ่ม',
              clear: 'ล้าง',
              ok: 'ตกลง',
              cacel: 'ยกเลิก'
            }
          },
        },
      },
    },
  })

export default i18next