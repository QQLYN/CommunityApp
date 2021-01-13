import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Card, CardItem, Left, Body } from 'native-base';
import { axios_config, url } from '../Config';
import styles from '../styles';
import axios from 'axios';

export default function ReservationRecord({ route , navigation }) {
    const [reservationRecord, setReservationRecord] = useState([]);
    const loginID = route.params.LoginID;
    const finalUrl = url + 'ReservationRecord?filterByFormula=MemberID%3D' + loginID +'&sort%5B0%5D%5Bfield%5D=ReservationDate&sort%5B0%5D%5Bdirection%5D=desc';

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });
        //類似停止監聽
        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => (
        <Card>
            <CardItem bordered style={{backgroundColor: "#ACD6FF"}}>
                <Body>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Left style={{ maxWidth: '20%' }}>
                            <Text style={{ fontWeight: "bold" }}>{item.fields.FacilityName}</Text>
                        </Left>
                    </View>
                </Body>
            </CardItem>

            <CardItem header bordered >
                <Body>
                    <Text>預約日期: {item.fields.ReservationDate} </Text>
                    <Text></Text>
                    <Text>預約時段: {item.fields.ReservationTime}</Text>
                    <Text></Text>
                    <Text>預約人數: {item.fields.ReservationCount}</Text>
                </Body>
            </CardItem>
        </Card>
    )

    async function fetchData() {
        try {
            const result = await axios.get(finalUrl, axios_config);
            setReservationRecord(result.data.records);
        }
        catch(e) {
            console.log(e);
        }
    }

    return (
        <Container>
            <View>
                <FlatList style={styles.item}
                    data={reservationRecord}
                    renderItem={renderItem}
                    keyExtractor={item => item.fields.RecordID.toString()} 
                />
            </View>
        </Container>
    );
}

ReservationRecord.navigationOptions = {
    tabBarIcon: ({ tintColor, focused }) => (
        <Icon
            name={focused ? 'ios-home' : 'md-home'}
            color={tintColor}
            size={25}
        />
    )
}

