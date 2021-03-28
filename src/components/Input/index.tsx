import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { ErrorMessage, FieldInputProps, FormikProps } from "formik";
import { Color } from "@/utils/const";
import Icon, { IconNames } from "@/assets/iconfont/index";
import Touchable from "@/components/Touchable";

interface IProps {
    field: FieldInputProps<string>;
    form: FormikProps<string>;
    iconName: IconNames;
    cancel: (form: FormikProps<string>, field: FieldInputProps<string>) => void;
}

function Input({ field, form, iconName, cancel, ...rest }: IProps) {

    const onPress = () => {
        if (typeof cancel === "function") {
            cancel(form, field);
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <Icon name={iconName} color={Color.night} size={20} />
                <TextInput
                    {...field}
                    {...rest}
                    style={styles.input}
                    onChangeText={form.handleChange(field.name)}
                    onBlur={form.handleBlur(field.name)}
                />
                <Touchable onPress={onPress}>
                    <Icon name={"icon-chacha"} color={Color.night} size={20} />
                </Touchable>
                <ErrorMessage
                    name={field.name}
                    component={Text}
                    render={
                        msg => {
                            return (
                                <Text style={styles.error}>{msg}</Text>
                            );
                        }
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 15
    },
    inputView: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 25,
        backgroundColor: Color.white
    },
    input: {
        flex: 1,
        height: 50,
        marginLeft: 15
    },
    error: {
        position: "absolute",
        color: Color.red,
        left: 15,
        bottom: 0,
        fontSize: 12
    }
});

export default Input;
