import React from "react";
import { MapView } from "react-native-amap3d/lib/js";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigator/index";
import { StyleSheet } from "react-native";

interface IProps {
    route: RouteProp<RootStackParamList, "AMap">
}

function AMap({ route }: IProps) {
    return (
        <MapView
            style={StyleSheet.absoluteFillObject}
            zoomLevel={18}
            center={{
                latitude: route.params.latitude,
                longitude: route.params.longitude
            }}
        >
            <MapView.Marker
                draggable
                title="这是一个可拖拽的标记"
                coordinate={{
                    latitude: route.params.latitude,
                    longitude: route.params.longitude
                }}
            />
        </MapView>

    );
}

export default AMap;
