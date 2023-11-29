'use client'
import React, { useState } from 'react';
import { Button, Card, Checkbox, Form, Input, Select, message, } from 'antd';
import Logo from '@/components/animatedLogo';
import { useRouter } from 'next/navigation';


export default function Authentication() {
  const [translateGreen, setTranslateGreen] = useState<boolean>(false)
  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [nickName, setNickName] = useState<string>('')
  const [pleaseLogin, setPleaseLogin] = useState<boolean>(false)
  const router = useRouter()

  const [form] = Form.useForm();

  const handleClick = () => {
    setTranslateGreen(!translateGreen)
  }
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const onFinishSignup = (values: any) => {
    const data = {
      email: values.email,
      password: values.password,
      nickname: values.nickname,
      phone: values.phone,
      gender: values.gender,
      prefix: values.prefix
    };

    fetch('/api/login&signup/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((data) => {
        if (data.status === 201) {
          message.success(data.message)
          setIsRegistering(!isRegistering)
          setPleaseLogin(!pleaseLogin)
          setTimeout(() => {
            setTranslateGreen(!translateGreen)
          }, 2000)
        }
        if (data.status === 500) {
          message.error(data.message)
          setIsRegistering(!isRegistering)
        }
        if (data.status === 400) {
          message.info(data.message)
          setIsRegistering(!isRegistering)
        }
        console.log(data)
      })
      .catch(error => console.error('Error:', error));
  };

  const handleRegisterBtnClick = () => {
    setIsRegistering(!isRegistering)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishLogin = (values: any) => {
    const data = {
      email: values.email,
      password: values.password
    }
    fetch('/api/login&signup/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((data) => {
        if (data.status === 200) {
          message.success('Welcome to Sixteen Gallery')
          setIsLogin(!isLogin)
          setNickName(data.userData.name)
          setTimeout(() => {
            router.push('/')
          }, 2000);
        }
        if (data.status === 500) {
          message.error(data.message)
          setIsLogin(!isLogin)
        }
        if (data.status === 404) {
          message.info(data.message)
          setIsLogin(!isLogin)
        }
        if (data.status === 401) {
          message.info(data.message)
          setIsLogin(!isLogin)
        }
      })
      .catch(error => console.error('Error:', error));
  }

  const handleSignInClick = () => {
    setIsLogin(!isLogin)
  }

  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  const prefixSelector = (
    <Form.Item initialValue={'+92'} name="prefix" rules={[{ required: true, message: 'Please select your country code' }]} noStyle>
      <Select defaultValue={'+92'} style={{ width: 70 }}>
        <Option value="+86">+86</Option>
        <Option value="+87">+87</Option>
        <Option value="+92">+92</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className={`relative h-screen w-screen before:block before:w-[300vw] before:h-screen  before:bg-gradient before:absolute before:top-0 before:right-0 ${translateGreen ? 'before:translate-x-[-13%]' : 'before:translate-x-[79%]'} before:border-bottom-right-radius before:border-top-left-radius before:transition-all before:duration-1000 before:ease-in-out before:bg-gradient before:box-shadow overflow-hidden`}>

      <div className="absolute top-3 left-4 text-orange-600 font-dancing text-4xl tracking-wider">
        <Logo />
      </div>

      <div className='absolute top-0 left-0 flex flex-row h-screen w-screen bg-lue-300 justify-around items-center'>
        <Card id='login' hoverable className={`${translateGreen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} w-1/4 h-min rounded-2xl hover:bg-blue-50 transition-transform duration-1000 ease-in-out`}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinishLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className='flex flex-col gap-2 h-52 items-center justify-around'>
              <Form.Item<FieldType>
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  }
                ]}
                noStyle
              >
                <Input placeholder='Email' allowClear />
              </Form.Item>
              <Form.Item<FieldType>
                noStyle
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder='Password' allowClear />
              </Form.Item>
              <Form.Item<FieldType>
                noStyle
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item
                noStyle>
                <Button onClick={handleSignInClick} type="default" htmlType="submit" loading={isLogin}>
                  Sign In
                </Button>
              </Form.Item>
              <Form.Item
                noStyle>
                <div className='flex flex-col items-center justify-center text-xs'>
                  <p className='font-bold'>Forgot password?</p>
                  <p>Don&rsquo;t have an account? <b onClick={handleClick}>Sign up here</b> </p>
                </div>
              </Form.Item>
            </div>
          </Form>
        </Card>
        <Card id='signup' hoverable className={`${translateGreen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} w-1/4 h-min rounded-2xl hover:bg-blue-50 scle-0 transition-transform duration-1000 ease-in-out`}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinishSignup}
            style={{ maxWidth: 600 }}
            scrollToFirstError
          >
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-3'>
                <Form.Item
                  noStyle
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    }
                  ]}
                >
                  <Input placeholder="E-mail" allowClear />
                </Form.Item>

                <Form.Item noStyle
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Password" allowClear />
                </Form.Item>

                <Form.Item noStyle
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" allowClear />
                </Form.Item>


                <Form.Item noStyle
                  name="nickname"
                  label="Nickname"
                  tooltip="What do you want others to call you?"
                  rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                >
                  <Input placeholder='Nickname' allowClear />
                </Form.Item>

                <Form.Item noStyle
                  name="phone"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder='Phone Number' allowClear />
                </Form.Item>
              </div>
              <div className='flex flex-row justify-between'>
                <Form.Item noStyle
                  name="gender"
                  rules={[{ required: true, message: 'Please select gender!' }]}
                >
                  <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item noStyle {...tailFormItemLayout}>
                  <Button onClick={handleRegisterBtnClick} type="default" htmlType="submit" loading={isRegistering}>
                    Register
                  </Button>
                </Form.Item>
              </div>
              <div className='text-xs self-center'>
                <p>Already have an account? <b onClick={handleClick}>Sign in here</b></p>
              </div>
            </div>
          </Form>
        </Card>
      </div>
      <div className={`absolute top-1/2 right-0 text-white text-9xl font-bold -translate-y-1/2 ${translateGreen ? 'translate-x-full opacity-0' : '-translate-x-16'} pointer-events-none transition-transform duration-1000 ease-in-out`}>
        <div>Welcome</div>
        <div className={`${nickName.length > 0 ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} absolute transition-all duration-1000 ease-in-out text-7xl `}>{nickName}</div>
      </div>
      <div className={`absolute top-1/2 left-0 text-white text-9xl font-bold -translate-y-1/2 ${translateGreen ? 'translate-x-20' : '-translate-x-full opacity-0'} pointer-events-none transition-transform duration-1000 ease-in-out`}>
        <div>
          Join with <br />us
        </div>
        {pleaseLogin && <div className={`${pleaseLogin ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} transition-all duration-1000 ease-in-out text-2xl delay-500`}>Please login to continue</div>}
      </div>

    </div>
  )
}
