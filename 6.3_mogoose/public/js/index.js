let ajax = axios.create({
  baseURL: 'http://localhost:4001/',
  timeout: 1000
});
let app = new Vue({
    el: '#app',
    data: {
      dialogFormVisible: false,
      formLabelWidth: '100',
      tableData: [],
      options: [
        {
          value: 0,
          label: '星期日'
        },
        {
          value: 1,
          label: '星期一'
        },
        {
          value: 2,
          label: '星期二'
        },
        {
          value: 3,
          label: '星期三'
        },
        {
          value: 4,
          label: '星期四'
        },
        {
          value: 5,
          label: '星期五'
        },
        {
          value: 6,
          label: '星期六'
        },
      ],
      value1:'',
      value2:'',
      value3:'',
      form: {
        name: '',
        startTime: {
          hour: 0,
          minute: 0
        },
        endTime: {
          hour: 0,
          minute: 0
        },
        weekday: 0,
      },
      id: '',
      dialogTitle: '新增课程表'
    },
    mounted() {
      this.query();
    },
    methods: {
        query() {
          ajax.get('course').then(res => {
            console.log(res)
            if (res.data.status === 0) {
              this.tableData = res.data.data;
            } else {
              this.$message({
                message: '查询失败',
                type: 'warning'
              });
            }
          })
        },
        add() {
          this.dialogTitle = '新增课程表'
          this.dialogFormVisible = true;
          this.form = {
            name: '',
            startTime: {
              hour: 0,
              minute: 0
            },
            endTime: {
              hour: 0,
              minute: 0
            },
            weekday: 0
          };
          this.value1 = '';
          this.value2 = '';
          this.value3 = '';
        },
        confirm() {
          this.form.startTime.hour = Number(this.value1.split(':')[0]);
          this.form.startTime.minute = Number(this.value1.split(':')[1]);
          this.form.endTime.hour = Number(this.value2.split(':')[0]);
          this.form.endTime.minute = Number(this.value2.split(':')[1]);
          this.form.weekday =this.value3;
          if (this.dialogTitle === '新增课程表') {
            this.addAjax();
          } else {
            this.editdAjax();
          }
        },
        addAjax() {
          ajax.post('course', this.form).then(res => {
          this.dialogFormVisible = true;
          if (res.data.status === 0) {
            this.dialogFormVisible = false;
            this.$message({
              message: '新增成功',
              type: 'success'
            });
            this.query();
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
          })
        },
        editdAjax() {
          ajax.put(`course/${this.id}`, this.form).then(res => {
          this.dialogFormVisible = true;
          if (res.data.status === 0) {
            this.dialogFormVisible = false;
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.query();
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
          })
        },
        resetweekday(weekday) {
          let day;
          switch (weekday) {
            case 0:
                day = "星期天";
                break;
            case 1:
                day = "星期一";
                break;
            case 2:
                day = "星期二";
                break;
            case 3:
                day = "星期三";
                break;
            case 4:
                day = "星期四";
                break;
            case 5:
                day = "星期五";
                break;
            case 6:
                day = "星期六";
          }
          return day;
        },
        handleEdit(index, row) {
          this.dialogTitle = '编辑课程表';
          this.dialogFormVisible = true;
          this.form = row;
          this.value1 = `${row.startTime.hour}:${row.startTime.minute}`;
          this.value2 = `${row.endTime.hour}:${row.endTime.minute}`;
          this.value3 = row.weekday;
          this.id = row._id;
        },
        handleDelete(index, row) {
          this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteAjax(row._id)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        },
        deleteAjax(id) {
          ajax.delete(`course/${id}`).then(res => {
            if (res.data.status === 0) {
              this.dialogFormVisible = false;
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.query();
            } else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              });
            }
            })
        }
    },
  })