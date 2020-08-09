import { create, Model } from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import modelExtend from 'dva-model-extend';
import models from '@/models/index';
import homeModel from "@/models/home";

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

interface Cached {
  [key:string]:boolean;
}

const cached:Cached = {
  home:true,
}

function registerModel(model:Model) {
  if (!cached[model.namespace]){
    app.model(model);
    cached[model.namespace] = true;
  }
}

export function createHomeModel(namespace:string) {
  const model = modelExtend(homeModel,{namespace});
  registerModel(model);
}
