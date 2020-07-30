import {create} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import models from '@/models/index';

//1.创建实例
const app = create();
//2.加载model对象
models.forEach((model) => {
  app.model(model);
});
app.use(createLoading());
//3.启动dva
app.start();

//4.导出dva的数据
export default app._store;
