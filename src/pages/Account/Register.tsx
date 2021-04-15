import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { Formik, Field, FieldInputProps, FormikProps } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import { Color } from "@/utils/const";
import Touchable from "@/components/Touchable";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { ModalStackNavigation } from "@/navigator/index";


const customerValidation = Yup.object().shape({
    account: Yup.string().required("请输入账号"),
    password: Yup.string().required("请输入密码"),
    repeat_password: Yup.string().required("请二次输入密码").test("repeat_password", "密码错误", function(value) {
        return this.parent.password === value;
    }),
    phone: Yup.string().notRequired().test("phone", "手机号码格式错误", function(value) {
        if (value === undefined || value?.length === 0) {
            return true;
        }
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(value as string);
    })
});

interface Values {
    account: string;
    password: string;
    repeat_password: string;
    phone: string;
}

const initialValues: Values = {
    account: "",
    password: "",
    repeat_password: "",
    phone: ""
};

const mapStateToProps = ({ user, loading }: RootState) => {
    return {
        isLogin: user.isLogin,
        loading: loading.effects["user/register"]
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: ModalStackNavigation;
}


function Register({ navigation, dispatch, isLogin, loading }: IProps) {

    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (isLogin) {
            setTimeout(() => {
                navigation.goBack();
            }, 100);
        }
    }, [isLogin]);

    const onSubmit = (values: Values) => {

        if (disabled || loading) {
            return;
        }

        setDisabled(true);

        dispatch({
            type: "user/register",
            payload: values,
            callback: () => {
                setDisabled(false);
            }
        });
    };


    const cancel = (form: FormikProps<string>, field: FieldInputProps<string>) => {
        if (field.name === "account") {
            form.setFieldValue("account", "");
        } else if (field.name === "password") {
            form.setFieldValue("password", "");
        } else if (field.name === "repeat_password") {
            form.setFieldValue("repeat_password", "");
        } else if (field.name === "phone") {
            form.setFieldValue("phone", "");
        }
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={customerValidation}>
                {({ handleSubmit }) => (
                    <View>
                        <Field
                            name="account"
                            placeholder="请输入用户名"
                            component={Input}
                            iconName={"icon-Account"}
                            cancel={cancel}
                        />
                        <Field
                            name="password"
                            placeholder="请输入密码"
                            component={Input}
                            iconName={"icon-mima"}
                            secureTextEntry
                            cancel={cancel}
                        />
                        <Field
                            name="repeat_password"
                            placeholder="请再输入密码"
                            component={Input}
                            iconName={"icon-mima"}
                            secureTextEntry
                            cancel={cancel}
                        />
                        <Field
                            name="phone"
                            placeholder="请输入手机号(选填)"
                            component={Input}
                            iconName={"icon-mobile-phone"}
                            cancel={cancel}
                        />
                        <View style={styles.jumpView}>
                            <Text style={styles.jumpTitle}>忘记密码?</Text>
                            <Touchable onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.jumpTitle}>立即登录</Text>
                            </Touchable>
                        </View>
                        <Touchable disabled={disabled} onPress={handleSubmit} style={styles.login}>
                            <Text style={styles.loginText}>注册</Text>
                        </Touchable>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 200,
        paddingHorizontal: 15
    },
    jumpView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 15
    },
    jumpTitle: {
        color: Color.dark_title
    },
    login: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        backgroundColor: Color.theme,
        marginHorizontal: 20
    },
    loginText: {
        fontSize: 18,
        fontWeight: "bold",
        color: Color.white,
        textAlign: "center",
        lineHeight: 50
    }
});

export default connector(Register);
