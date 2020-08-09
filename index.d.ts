declare module 'dva-model-extend' {
  import { Model } from 'dva-core-ts';
  export default function modelExtend(...model: Model[]): Model;
}
