import db from '../models';
import AuthenticationTest from './forms/AuthenticationTest';
import TaskTest from './forms/TaskTest';

new AuthenticationTest().execute();
new TaskTest().execute();

