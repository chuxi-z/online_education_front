import request from '@/utils/request'

export default{
    getSubjectList() {
        return request({
            // url: '/table/list',
            url: '/eduservice/subject/getAllSubject',
            method: 'get'
          })
    }
}