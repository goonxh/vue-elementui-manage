import {baseUrl} from "../../../../config/utils";

export default {
    data() {
        return {
            tableData: [],
            loading: false,
            tablePageSize: 10,
            pagination: {},
        }
    },
    created() {
        this.getLogList();
    },
    methods: {
        getLogList({page = 1,pageSize = this.tablePageSize} = {
            page: 1,
            pageSize: this.tablePageSize
        }) {
            this.loading = true;
            this.axios.get(`${baseUrl}/log`,{params: {page:page,pageSize:pageSize}}).then((res) => {
                this.tableData = res.data.data;
                this.pagination = res.data.pagination;
            }).catch((err)=>{
                this.$message.error(err)
            }).finally(()=>{
                this.loading = false;
            })
        },
        rowClick() {

        },
        handleSelectionChange() {

        },
        handleCurrentChange(val) {
            this.getLogList({page:val, page_size:this.tablePageSize});
        },
        handleSizeChange(val) {
            this.tablePageSize = val;
            this.getLogList({page:1, page_size:this.tablePageSize});
        },
        refreshTable() {
            this.getLogList();
        }
    }
}