import request from '@/utils/request'

export function registerEducation(requestParam) {
  const url = '/farmlog/education/curriculum'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, requestParam, config)
}
//
// export function registerEducation(params) {
//   const url = '/farmlog/education'
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }
//   return request.post(url, params, config)
// }

export function getEducation(params) {
  const url = '/farmlog/education/curriculums'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: params
  }
  return request.get(url, config)
}

export function getEducationByCurriculumId(curriculumId) {
  const url = '/farmlog/education/' + curriculumId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function modifyEducation(curriculumId, params) {
  const url = '/farmlog/education/' + curriculumId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, params, config)
}

export function getEducationProgress(curriculumId) {
  const url = '/farmlog/education/' + curriculumId + '/progress'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function getEducationAccounts(curriculumId) {
  const url = '/farmlog/education/' + curriculumId + '/accounts'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function registerEnrollment(params) {
  const url = '/farmlog/education/enrolment'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, params, config)
}

export function getAttendanceStudent(params) {
  const url = '/farmlog/education/attendance/students'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: params
  }
  return request.get(url, config)
}

export function updateAttendance(params) {
  const url = '/farmlog/education/attendance'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, params, config)
}
