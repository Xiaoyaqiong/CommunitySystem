export function getLoginFormRules(formData) { 
  const noSpaceValidator = (rule, value, callback) => {
    if (value && value.trim() === '') {
      callback(new Error('内容不能为仅空格'));
    } else {
      callback();
    }
  };
     return {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
         },
         {
        validator: noSpaceValidator,
        trigger: 'blur'
      }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' },{
        validator: noSpaceValidator,
        trigger: 'blur'
      }],
  }
}
export function getRegisterForm(formData) { 
  const PasswordConfirm = (rule, value, callback) => {
    if (value !== formData.password) {
      callback(new Error('两次密码不一致'));
    } else {
      callback();
    }
  };
  const checkPhone = (rule, value, callback) => {
    if (/^1[3-9]\d{9}$/.test(value)) {
      callback();
    } else {
      callback(new Error('手机格式不符合'));
    }
  };
  return {
     username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [
      { required: true, message: '请再次输入密码', trigger: 'blur' },
      { validator: PasswordConfirm, trigger: 'blur' },
    ],
    // 其他字段规则
    gender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
    phone: [
      { min: 11, message: "手机号不足11位", trigger: "blur" },
      { validator: checkPhone, trigger: "blur" }],
  }
}
export function getUserInfoForm() { 
  const checkPhone = (rule, value, callback) => {
    if (/^1[3-9]\d{9}$/.test(value)) {
      callback();
    } else {
      callback(new Error('手机格式不符合'));
    }
  };
  return {
     
    buildingNumber: [{ required: true, message: '请输入栋数', trigger: 'blur' }],
    unitNumber: [{ required: true, message: '请输入单元号', trigger: 'blur' }],
    doorNumber: [{ required: true, message: '请输入房间号', trigger: 'blur' }],
    phone: [
      { min: 11, message: "手机号不足11位", trigger: "blur" },
      { validator: checkPhone, trigger: "blur" }],
    idCard: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
    email: [{ required: false,  trigger: 'blur' }],
  }
}