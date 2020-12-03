# 与服务端交互

## 前端请求流程

在 `admin-antd-vue` 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1.  UI 组件交互操作；
2.  调用统一管理的 `store.ts` StoreModel；(此步可以省略，可以直接进行下步)
3.  `store.ts` 调用 `service.ts` api 请求函数；
4.  使用封装的 `@/utils/request.ts` 发送请求；
5.  获取服务端返回；
6.  更新 data；


##  request.ts

`@/utils/request.ts` 是基于 [Axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。具体可以参看 [@/utils/request.ts](https://github.com/lqsong/admin-antd-vue/blob/main/src/utils/request.ts)。
它封装了全局 `request拦截器`、`response拦截器`、`统一的错误处理`、`统一做了超时处理`、`baseURL设置等`。

## 一个表单提交例子：

[代码](https://github.com/lqsong/admin-antd-vue/tree/main/src/views/pagesample/form/basic)


```ts
// @/views/pagesample/form/basic/service.ts
import request from '@/utils/request';
import { FormDataType } from './data.d';

export async function createData(params: FormDataType): Promise<any> {
  return request({
    url: '/pages/form',
    method: 'POST',
    data: params,
  });
}

```

```ts
// @/views/pagesample/form/basic/store.ts
import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { createData } from './service';
import { FormDataType } from "./data.d";

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface StateType {}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
    };
    actions: {
        create: Action<StateType, StateType>;
    };
}

const initState: StateType = {};

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'FormBasic',
    state: {
        ...initState
    },
    mutations: {        
    },
    actions: {
        async create({ commit }, payload: FormDataType) {
            try {
                await createData(payload);
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}

export default StoreModel;
```

```ts
// @/views/pagesample/form/basic/index.vue
```
```vue
<template>
    <div class="indexlayout-main-conent">
      <a-card :bordered="false">
        <a-form :wrapper-col="{xs: { span: 24 },sm: { span: 12 }, md: { span: 10 },}" :label-col="{ xs: { span: 24 }, sm: { span: 7 } }" >
            <a-form-item label="标题：" v-bind="validateInfos.title">
                <a-input v-model:value="modelRef.title" placeholder="请输入" />
            </a-form-item>
            <a-form-item label="起止日期" v-bind="validateInfos.date">
                <a-range-picker v-model:value="modelRef.date" style="width:100%" />
            </a-form-item>

            <a-form-item label="下拉选择" v-bind="validateInfos.select">
                <a-select v-model:value="modelRef.select"  placeholder="请选择" allowClear>
                    <a-select-option value="1">select1</a-select-option>
                    <a-select-option value="2">select2</a-select-option>
                    <a-select-option value="3">select3</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="单选按钮1">
                <a-radio-group  v-model:value="modelRef.radio1" >
                    <a-radio value="1">item 1</a-radio>
                    <a-radio value="2">item 2</a-radio>
                    <a-radio value="3">item 3</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item label="单选按钮2"  v-bind="validateInfos.radio2">
                <a-radio-group  v-model:value="modelRef.radio2" >
                    <a-radio-button value="1">item 1</a-radio-button>
                    <a-radio-button value="2">item 2</a-radio-button>
                    <a-radio-button value="2">item 3</a-radio-button>
                </a-radio-group>
            </a-form-item>

            <a-form-item label="复选框" v-bind="validateInfos.checkbox">
                <a-checkbox-group v-model:value="modelRef.checkbox">
                    <a-checkbox value="1" name="type">
                    Online
                    </a-checkbox>
                    <a-checkbox value="2" name="type">
                    Promotion
                    </a-checkbox>
                    <a-checkbox value="3" name="type">
                    Offline
                    </a-checkbox>
                </a-checkbox-group>
            </a-form-item>

            <a-form-item label="备注" v-bind="validateInfos.remark">
                <a-textarea v-model:value="modelRef.remark" />
            </a-form-item>

            
            <a-form-item :wrapper-col="{xs: { span: 24, offset: 0 },sm: { span: 10, offset: 7 }}">
                <a-button type="primary" @click="handleSubmit" :loading="submitLoading">
                   提交
                </a-button>
                <a-button @click="resetFields" style="margin-left: 10px;">
                   重置
                </a-button>   
            </a-form-item>


        </a-form>
      </a-card>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { useForm } from "@ant-design-vue/use";
import { Props, validateInfos } from '@ant-design-vue/use/lib/useForm';
import useI18nAntdFormVaildateInfos from "@/composables/useI18nAntdFormVaildateInfos";
import { FormDataType } from "./data.d";
import { StateType as FormStateType } from "./store";

interface FormBasicPageSetupData {
    resetFields: (newValues?: Props) => void;
    validateInfos: validateInfos;
    modelRef: FormDataType;
    submitLoading: boolean;
    handleSubmit: (e: MouseEvent) => void;
}

export default defineComponent({
    name: 'FormBasicPage',
    setup(): FormBasicPageSetupData {

        const store = useStore<{FormBasic: FormStateType}>();

        // 表单值
        const modelRef = reactive<FormDataType>({
            title: '',
            date: [],
            select: '',
            radio1: '',
            radio2: '',
            checkbox: [],
            remark: ''
        });
        // 表单验证
        const rulesRef = reactive({
            title: [
                {
                    required: true,
                    message: '必填',
                },
            ],
            date: [
                {
                    required: true,
                    message: '必填',
                    trigger: 'change', 
                    type: 'array' 
                },
            ],  
            select: [
                {
                    required: true,
                    message: '请选择',
                },
            ],  
            radio1: [],  
            radio2: [
                {
                    required: true,
                    message: '请选择',
                },
            ],
            checkbox:[],
            remark: []       
        });
        // 获取表单内容
        const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
        // 重置 validateInfos 如果用到国际化需要此步骤
        //const validateInfosNew = useI18nAntdFormVaildateInfos(validateInfos);

        // 登录loading
        const submitLoading = ref<boolean>(false);
        // 登录
        const handleSubmit = async (e: MouseEvent) => {
            e.preventDefault();
            submitLoading.value = true;
            try {
                const fieldsValue = await validate<FormDataType>();
                const res: boolean = await store.dispatch('FormBasic/create',fieldsValue);                
                if (res === true) {
                    message.success('提交成功');
                    resetFields();                    
                }
            } catch (error) {
                // console.log('error', error);
            }
            submitLoading.value = false;
        };

        return {
            resetFields,
            validateInfos: validateInfos as unknown as validateInfos,
            modelRef,
            submitLoading: submitLoading as unknown as boolean,
            handleSubmit,
        }



    }
})
</script>

```
