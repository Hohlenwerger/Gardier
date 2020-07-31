import * as React from 'react';
import * as Location from 'expo-location';
import MapView, { Animated, Circle } from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { View } from 'react-native';

import { Entypo, EvilIcons } from '@expo/vector-icons';

import { AlertInput } from '../components/AlertCustomElements'

const AlertMap = ({ location, setAddress }) => {
    const [location_, setLocation] = React.useState(null)
    const [mapRegion, setMapRegion] = React.useState(null)
    const [marker, setMarker] = React.useState(null)
    const [street, setStreet] = React.useState()
    const mapRef = React.createRef()

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            let l = await Location.getCurrentPositionAsync({});
            setLocation(l);
        })()
    }, [location]);

    React.useEffect(() => {
        if (location_ != null && mapRegion == null) {
            setMapRegion({
                latitude: location_.coords.latitude,
                longitude: location_.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            })

            setMarker({
                latlng: {
                    latitude: location_.coords.latitude,
                    longitude: location_.coords.longitude,
                },
                title: 'Posição atentado',
                description: 'proximo a'
            })
        }
    }, [location_])

    const handleMapRegionChange = mapRegion => {
        setMapRegion(mapRegion)
    }

    const handleMarkerAsync = async address => {
        let arrAddressMap = await Location.geocodeAsync(address)
        console.log(address)
        if (arrAddressMap.length > 0) {
            let arrAddress = await Location.reverseGeocodeAsync(arrAddressMap[0])
            setMapRegion({
                latitude: arrAddressMap[0].latitude,
                longitude: arrAddressMap[0].longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            })

            let latlng = {
                latitude: arrAddressMap[0].latitude,
                longitude: arrAddressMap[0].longitude,
            }

            setMarker({
                latlng,
                title: 'Localização atentado',
                description: 'Área do ocorrido'
            })

            console.log(arrAddress, 'foi')

            setAddress({
                latlng,
                ...arrAddress[0]
            })
        }

    }

    const updateMarker = street => {
        setStreet(street)
        handleMarkerAsync(street)
    }

    return (
        <View>
            <AlertInput
                label={"Aonde aconteceu?"}
                placeholder={"Local"}
                onBlur={updateMarker}
                Icon={({ styles }) => <EvilIcons name="location" size={24} color="#211f30" style={styles} />} />
            {mapRegion != null && (
                <View style={{ borderRadius: 20, borderWidth: 2, overflow: 'hidden', marginTop: 15}}>
                    <MapView
                        ref={mapRef}
                        style={{ alignSelf: 'stretch', height: 225 }}
                        customMapStyle={[{ borderRadius: 0 }]}
                        minZoom={10}
                        showsUserLocation={true}
                        region={mapRegion}
                        onRegionChangeComplete={handleMapRegionChange}
                    >
                        <Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                        <Circle
                            center={marker.latlng}
                            radius={100}
                            fillColor={'rgba(255, 0, 0, 0.6)'}
                        />
                    </MapView>
                </View>)}
        </View>
    )
}

export default AlertMap