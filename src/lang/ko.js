export default {
  route: {
    Menu: {
      FarmLogManage: '농장일지관리',
      FarmLog: '영농일지',
      EnvironmentLog: '환경일지',
      CultivateInfo: '재배정보',
      GrowthInfo: '생육정보',
      AgriculturalInfo: '농사정보',
      PesticideInfo: '농약정보',
      FertilizerInfo: '비료정보',
      EducationManage: '교육관리',
      FarmManage: '농장관리',
      PesticideLog: '농약정보',
      manage: '관리자'
    },
    Main: '메인',
    'dashboard': '대시보드',
    Farm: '농장관리',
    farmList: '농장관리',
    farmInfo: '농장정보',
    farmRegist: '농장등록',
    EducationRegist: '교육등록',
    'EducationList': '교육정보',
    'EducationApply': '교육신청',
    'EducationAttendance': '출석관리',

    GreenhouseEnvironment: '온실환경정보',
    CropPhysiologyt: '작물생리정보',
    CropGrowth: '생육지표',
    GrowthChart: '생장상 그래프',
    GrowthData: '생육 데이터',

    Environment: '환경 지표',
    ObservationChart: '환경계측 차트',
    ModelingChart: '모델링식 차트',

    Nourishment: '양수분 치표',

    Measured: '계측값',

    DiseaseInfo: '병해충 정보',
    Consulting: '컨설팅 리포트 관리',

    NutrientManagement: '양수분 지표',
    MeasuredValue: '계측값',

    Data: 'Raw Data',
    'temperature': '수온',
    'pH': 'PH',
    'dissolvedOxygen': 'DO (용존산소량)',
    'co2': 'CO2 농도',
    'dhum': '이슬점',
    'gndhum': '지습(FDR)',
    'gndtemp': '지온(FDR)',
    'inhum': '내부습도',
    'intemp1': '내부온도1',
    'intemp2': '내부온도2',
    'intemp3': '내부온도3',
    'outtemp': '외부온도',
    'sunadd': '누적일사량',
    'sunvol': '일사량',
    'winddsp': '풍속',

    Lot: '온실',
    'lotList': '온실 관리',
    'lotInfo': '온실 정보',
    'lotRegist': '온실 등록',

    Sensor: '센서',
    'sensorList': '센서 관리',
    'sensorInfo': '센서 정보',
    'sensorRegist': '센서 등록',

    Attribute: '데이터 속성',
    'attributeList': '데이터 속성 관리',
    'attributeInfo': '데이터 속성 정보',
    'attributeRegist': '데이터 속성 등록',

    /**
     * 시스템 관리
     */
    system: '시스템 관리',
    download_manager: '다운로드 관리',
    approval_manager: '승인 관리',
    administrator_manager: '관리자 계정 관리',
    administrator_register: '관리자 등록',
    administrator_detail: '관리자 마이페이지',
    administrator_modify: '관리자 수정',
    administrator_store_manager_config: '시설 관리자 설정',
    store_manager_config_edit: '시설 관리자 설정 수정',
    batch: '배치 관리',
    batchTask: '정산배치 수동관리',
    error: '에러 관리',
    externalError: '외부 연동 에러',
    managerError: '관리자용 에러'
  },
  Admin: {
    Account: {
      ModifyInfo: '계정 정보',
      AccountId: '관리자 ID',
      resetPassword: '비밀번호 초기화',
      Role: '권한',
      TelNo: '관리자 연락처',
      FarmList: '관리 농장 목록',
      FarmCode: '농장코드',
      FarmName: '농장명',
      FarmDelete: '농장 삭제',
      AccountDeleteTitle: '계정 삭제',
      AccountDelete: '계정을 삭제하시겠습니까?',
      NoneFarm: '등록된 농장이 없습니다.',
      AddFarm: '관리 농장 등록',
      Validation: {
        CheckMixPassword: '',
        CheckPassword: '',
        AccountType: '',
        AccountName: '',
        possibleAccountId: '사용하실수 있는 아이디 입니다.',
        alreadyAccountId: '이미 사용중인 아이디 입니다.'
      },
      ResetPasswordTitle: '비밀번호 초기화',
      ResetPassword: '비밀번호 초기화 하시겠습니까?',
      ModifyConfirmTitle: '계정 정보 수정',
      ModifyConfirm: '계정 정보룰 수정 하시겠습니까?'
    }
  },
  error: {
    empty_roles: '사용자 권한은 반드시 있어야합니다.',
    invalid_token: '사용자 인증에 실패했습니다. 다시 로그인 해주세요.'
  },
  Modal: {
    SelectFarmModal: {
      Title: '농장 선택',
      FarmName: '농장명',
      FarmId: '농장 ID',
      NoneDataSearch: '검색',
      statusY: '운영',
      statusN: '운영중지',
      messages: {
        addFarm: '농장이 추가되었습니다.'
      }
    }
  },
  common: {
    regDate: '등록일시',
    percent: '%',
    currency: '원',
    unitProduct: '개',
    language_change_success: '언어가 변경되었습니다',
    button: {
      search: '조회',
      add: '추가',
      del: '삭제',
      select: '조회',
      register: '등록',
      modify: '수정',
      list: '목록',
      save: '저장',
      download: '다운로드',
      excel_download: '엑셀 다운로드',
      find_file: '파일찾기',
      close: '닫기',
      confirm: '확인',
      request: '신청',
      continueExpireDate: '기간연장',
      useCancel: '사용취소처리',
      use: '사용처리',
      detail: '상세',
      show: '보기',
      detailShow: '상세보기',
      change: '변경',
      cancel: '취소',
      apply: '적용'
    },
    imageDescription: {
      desc1: '이미지 파일은 jpg/png/gif 형식만 가능. 파일 size는 500kb 이하. 최대 1개 선택 가능',
      desc2: '이미지 파일은 jpg/png/gif 형식만 가능. 파일 size는 500kb 이하. 최대 5개 선택 가능'
    },
    imageUploadError: {
      fail: '이미지 업로드가 실패했습니다.',
      validSize1: '이미지 사이즈를 1000 X 1000 이상으로 설정해주세요.',
      validSize2: '이미지 사이즈를 600 X 600 이상으로 설정해주세요.'
    },
    uploadDescription: {
      desc1: '이미지 파일은 jpg/png/gif/pdf 형식만 가능. 파일 size는 500kb 이하. 최대 1개 선택 가능'
    },
    message: {
      noneData: '검색결과가 없습니다.',
      confirmMessage: '등록 하시겠습니까?',
      registerMessage: '등록',
      completeRegistration: '등록이 완료되었습니다.',
      modifyConfirmMessage: '수정 하시겠습니까?',
      deleteConfirmMessage: '삭제 하시겠습니까?',
      modifyMessage: '수정',
      deleteMessage: '삭제',
      YES: '예',
      NO: '아니오',
      requestDownload: '다운로드 요청',
      completeDownload: '다운로드 요청이 완료되었습니다.',
      requestExcel: '엑셀 다운로드 요청',
      confirmExcelRequest: '엑셀다운로드 요청을 하시겠습니까?',
      completeExcel: '엑셀 다운로드 요청이 완료되었습니다.',
      requestExcelZeroCount: '다운로드 신청건수가 0 입니다.',
      urlFormatFail: 'URL형식이 올바르지 않습니다.'
    },
    fertilizer: {
      deleteMessage: '비료정보 삭제',
      modifyMessage: '비료정보 수정'
    },
    pesticide: {
      deleteMessage: '농약정보 삭제',
      modifyMessage: '농약정보 수정'
    },
    agency: '대행사',
    supplier: '공급사',
    brand: '브랜드',
    useStore: '사용처',
    salesChannel: '판매채널',
    salesClient: '판매거래처',
    basicInfo: '기본정보',
    status: '상태',
    select: '선택',
    search_select: '전체',
    useYN: '사용여부',
    useStatus: {
      Y: '사용',
      N: '미사용'
    },
    processStatus: '처리상태',
    processResult: '처리결과',
    processDate: '처리일시',
    processId: '처리자',
    requestNo: '요청번호',
    requestIdDate: '요청자/요청일시',
    requestDate: '요청일시',
    requestId: '요청자',
    chooseDate: '날짜선택',
    selectPeriod: '조회 기간',
    startDate: '시작일자',
    endDate: '종료일자',
    regDateTime: '등록일시',
    regId: '등록자',
    addCustomChart: '맞춤형 그래프 추가'
  },
  tagsView: {
    refresh: '새로고침',
    close: '닫기',
    closeOthers: '다른탭 닫기',
    closeAll: '전부 닫기'
  },
  navBar: {
    home: '홈으로',
    logout: '로그아웃',
    myPage: '마이페이지',
    authList: {
      systemAdmin: '시스템 관리자',
      partnerAdmin: '협력사 관리자',
      agencyAdmin: '대행사 관리자',
      agencyOperator: '대행사(운영자)',
      supplierAdmin: '공급사 관리자',
      brandAdmin: '브랜드 관리자',
      sellerAdmin: '판매 관리자',
      storeAdmin: '시설 관리자'
    }
  },
  login: {
    title: '영농정보',
    subTitle: 'Data Hub 관리자 시스템입니다.',
    id: '사용자 ID',
    password: '비밀번호',
    validation_error_id: '아이디는 4자리보다 작을 수 없습니다',
    validation_error_password: '비밀번호는 8자리보다 작을 수 없습니다',
    validation_error_form: '로그인 정보가 올바르지 않습니다',
    error_user_info: '아이디 또는 비밀번호가 일치하지 않습니다.',
    validation_error_input: '아이디 또는 비밀번호가 입력되지 않았습니다',
    admin_access_fail: 'VMaker 관리자 시스템에 접속할 수 없는 계정입니다.'
  },

  administrator: {
    number: 'NO',
    modifyInfo: '계정 정보',
    accountRoles: '권한',
    registerInfo: '관리자 정보',
    accountName: '관리자 명',
    accountId: '관리자 ID',
    accountType: '관리자 구분',
    mod_date: '등록일',
    password: '비밀번호',
    confirmPassword: '비밀번호 확인',
    telNo: '관리자 연락처',
    duplicateAccountId: 'ID 중복확인',
    accountRole: '권한',
    role: {
      systemAdmin: '시스템 관리자',
      consultant: '컨설턴트',
      farmer: '농장 관리자'
    }
  },
  farm: {
    number: 'NO',
    farmId: '농장 ID',
    farmName: '농장명',
    farmType: '시설구분',
    cropName: '재배작물',
    autoSensor: '자동센서',
    administrator: '관리자',
    regDate: '등록일',
    farmDeleteTitle: '농장 삭제',
    farmDelete: '농장을 삭제하시겠습니까?'
  },

  education: {
    educationRegist: '교육등록',
    educationApply: '출결관리',
    educationPersonnel: '대상자관리',
    type: '구분',
    educationType: '교육구분',
    educationName: '교육명',
    educationTerm: '교육기간',
    applyCheck: '출석체크',
    personnel: '정원',
    teacher: '강사',
    regDate: '등록일'
  },

  /** **********************************
   * 시스템 관리
   ************************************/
  Main: {

  },

  /** **********************************
   * 기관 관리
   ************************************/
  Farm: {
    field: {
      farmName: '농장 명',
      farmAddress: '주소',
      farmAddress2: '주소 상세',
      description: '설명',
      type: '구분'
    },
    validation: {
      farmName: '기관 명은 필수입니다.',
      farmAddress: '주소 정보는 필수입니다.'
    }
  },

  /** **********************************
   * 수온, PH, DO, 염도
   ************************************/
  Data: {
    salt: {

    }
  },

  /** **********************************
   * 수조 관리
   ************************************/
  Lot: {
    farmName: '농장 명',
    lotName: '온실명',
    temperature: '수온',
    pH: 'PH',
    dissolvedOxygen: 'DO',
    salt: '염도',
    description: '설명',
    validation: {
      farmId: '기관 명은 필수입니다.',
      lotName: '온실 명은 필수입니다.'
    }

  },

  /** **********************************
   * 센서 관리
   ************************************/
  Sensor: {
    deviceName: '센서 명',
    dataType: '데이터 유형',
    lotId: '온실 아이디',
    lotName: '온실 명',
    installLot: '설치 온실',
    farmName: '기관 명',
    validation: {
      deviceName: '센서 명은 필수입니다.',
      dataType: '데이터 유형은 필수입니다.',
      installLot: '설치 온실를 선택해주세요.'
    }
  },
  GreenHouseCustomChart: {
    selectDisplayItems: '표시 항목 선택',
    selectPeriodUnit: '기간 단위 선택',
    chooseTheDefaultLookupScope: '기본 조회 범위 선택',
    memo: '메모',
    subject: '제목',
    validation: {
      subject: '제목은 필수입니다.',
      periodUnit: '기간 단위를 선택해주세요.',
      defaultLookupScope: '기본 조회 범위를 선택해주세요.'
    }
  },
  messages: {
    stackTrace: '',
    messageModifyAccountInfo: '수정이 완료되었습니다.'
  }
}
