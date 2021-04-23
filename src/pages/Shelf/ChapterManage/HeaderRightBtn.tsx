import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";


interface IProps {
    isEdit: Boolean;
    onSubmit: () => void;
}

function HeaderRightBtn({ isEdit, onSubmit }: IProps) {
    return (
        <HeaderButtons>
            <Item title={isEdit ? "取消" : "编辑"} onPress={onSubmit} />
        </HeaderButtons>
    );
}


export default HeaderRightBtn;
