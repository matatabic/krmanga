import React, {memo} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";

const mapStateToProps = ({categorySetting}: RootState) => {
    return {
        isEdit: categorySetting.isEdit,
    }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    onSubmit: () => void;
}

function HeaderRightBtn({isEdit, onSubmit}: IProps) {
    return (
        <HeaderButtons>
            <Item title={isEdit ? '完成' : '编辑'} onPress={onSubmit}/>
        </HeaderButtons>
    );
}


export default connector(HeaderRightBtn);
