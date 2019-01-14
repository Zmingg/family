import React, {Component, Fragment} from 'react';
import {Form, Icon, Button, Input} from 'antd';
import './style.scss';

const FormItem = Form.Item;

export default Form.create()(class ArticleList extends Component {

  handleSubmit = async (e) => {
    e.preventDefault();
    const {auth} = this.props;
    auth('asdas');
  };

  componentDidMount() {

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem>
          {getFieldDecorator('user', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('pass', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                   type='password' placeholder='密码' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            登陆
          </Button>
        </FormItem>
      </Form>
    );
  }
});