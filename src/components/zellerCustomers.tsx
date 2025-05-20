import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, FlatList, StyleSheet, RefreshControl } from "react-native";
import { CheckBox, Divider, SearchBar } from '@rneui/base';
import { useIsFocused } from "@react-navigation/native";
import { executeQuery } from "../common/graphQLService";
import { listZellerCustomers } from "../queries/zellerCustomers.queries";
import { User } from "../models/zellerCustomers.model";

const ZellerCustomers = () => {
    // Variable used to check if the screen is focused
    const isFocused = useIsFocused();
    // Variable used to store the user types
    const [userTypes, setUserTypes] = useState([
        { id: '1', role: 'Admin', selected: false },
        { id: '2', role: 'Manager', selected: false },
    ])
    // Variable used to store the selected user type
    const [selectedUserType, setSelectedUserType] = useState<string | undefined>('');
    // Variable used to store the list of users
    const [userList, setUserList] = useState<User[]>([])
    // Variable used to store the list of selected users
    const [selectedUserList, setSelectedUserList] = useState<User[]>([])
    // Variable used to store the refresh control state
    const [refreshControl, setRefreshControl] = useState(false);
    // Variable used to store the search input
    const [search, setSearch] = useState('');
    // Variable used to store the primary color
    const primary = "#ff6666"

    // Function to get all users when the screen is focused
    useEffect(() => {
        getAllUsers();
    }, [isFocused])

    // Function to filter the users based on the search input and selected user type
    useEffect(() => {
        filterUsers();
    }, [search, userList, selectedUserType]);

    // Function to filter the users based on the search input and selected user type
    const filterUsers = () => {
        const baseList = userList.filter((user) => {
            if (selectedUserType === '1') return user.role === 'Admin';
            if (selectedUserType === '2') return user.role === 'Manager';
            return true;
        });
        const filteredList = baseList.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
        setSelectedUserList(filteredList);
    };

    // Function to handle the refresh control
    const onRefresh = async () => {
        setRefreshControl(true);
        setSelectedUserType('');
        setUserTypes(prev => {
            return prev.map((data) => {
                return { ...data, selected: false };
            });
        });
        await getAllUsers();
        setRefreshControl(false);
    };

    // Function to get all users from the API
    const getAllUsers = async () => {
        try {
            const res = await executeQuery(listZellerCustomers, {
                filter: { id: null, name: null, email: null, role: null }
            });
            setUserList(res.listZellerCustomers.items);
            setSelectedUserList(res.listZellerCustomers.items);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    // Function to render each user item in the FlatList
    const renderItem = ({ item }: { item: User }) => {
        const initials = item.name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
        return (
            <View style={styles.renderContainerStyle}>
                <View style={styles.initialAvatar}>
                    <Text style={styles.initialText}>{initials}</Text>
                </View>
                <View>
                    <Text style={[styles.customerNameStyle, { fontSize: 16 }]}>{item.name}</Text>
                    <Text style={[styles.customerNameStyle, { fontSize: 14 }]}>{item.role}</Text>
                </View>
            </View>
        )
    }

    // Function to handle the change of user type
    const ChangeUserType = (id: string) => {
        setSelectedUserType(id);
        setUserTypes(prev => {
            return prev.map((data) => {
                if (data.id === id) {
                    return { ...data, selected: true };
                }
                return { ...data, selected: false };
            });
        });
        if (id === '1') {
            setSelectedUserList(userList.filter((user) => user.role === "Admin"));
        } else if (id === '2') {
            setSelectedUserList(userList.filter((user) => user.role === "Manager"));
        }
    };

    return (
        <View style={styles.container} accessibilityLabel="zellerCustomers">
            <StatusBar backgroundColor={primary} />
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Customers</Text>
            </View>
            <SearchBar
                testID="search"
                accessibilityLabel="search"
                placeholder="Search by customer name"
                onChangeText={setSearch}
                value={search}
                lightTheme
                round
                containerStyle={styles.searchContainerStyle}
                inputContainerStyle={styles.searchInputContainerStyle}
                inputStyle={{ fontSize: 14 }}
                autoCorrect={false}
            />
            <View style={{ padding: 0 }}>
                <Text style={styles.userTypeHeadingStyle}>User Types</Text>
                {userTypes.map((user) => (
                    <CheckBox
                        accessibilityLabel={`checkbox-${user.role.toLowerCase()}`}
                        testID={`checkbox-${user.role.toLowerCase()}`}
                        key={user.id}
                        checkedIcon={"dot-circle-o"}
                        uncheckedIcon={"circle-o"}
                        title={<Text style={styles.userTypeTextStyle}>{user.role}</Text>}
                        checked={user.selected}
                        containerStyle={styles.userTypeContainerStyle}
                        checkedColor={primary}
                        onPress={() => ChangeUserType(user.id)}
                    />
                ))}
            </View>
            <Divider width={0} color="#000000aa" style={styles.dividerStyle} />
            <View style={styles.listContainerStyle}>
                <FlatList
                    accessibilityLabel="user"
                    testID="user"
                    data={selectedUserList}
                    keyExtractor={(item) => item?.id}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshControl} onRefresh={onRefresh} colors={['#ff6666']} />
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContentContainerStyle}
                    ListHeaderComponent={() => (
                        <View>
                            <Text style={styles.listHeaderStyle}>
                                {selectedUserType === '1' ? "Admin " : selectedUserType === '2' ? "Manager " : ""}Users
                            </Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.listEmptyStyle}>
                            <Text style={{ color: '#888' }}>No users found</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default ZellerCustomers;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff"
    },
    headerContainer: {
        backgroundColor: "#ff6666", padding: 15, paddingLeft: 20
    },
    heading: {
        color: "white", fontSize: 22, fontWeight: "bold"
    },
    searchContainerStyle: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
        marginTop: 15
    },
    searchInputContainerStyle: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        height: 40
    },
    userTypeHeadingStyle: { fontSize: 20, fontWeight: "bold", color: '#000000aa', paddingHorizontal: 20, paddingVertical: 10 },
    userTypeTextStyle: { fontSize: 14, marginLeft: 10, color: '#000000aa' },
    userTypeContainerStyle: { paddingLeft: 10, padding: 0 },
    dividerStyle: { marginHorizontal: 20, marginVertical: 20, opacity: 0.5 },
    listContainerStyle: { paddingHorizontal: 20, flex: 1 },
    listContentContainerStyle: {
        paddingBottom: 20,
        flexGrow: 1
    },
    listHeaderStyle: { fontSize: 20, fontWeight: "bold", color: '#000000aa', marginBottom: 10 },
    listEmptyStyle: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
    renderContainerStyle: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
    customerNameStyle: {
        marginLeft: 10, color: '#000000aa'
    },

    initialAvatar: {
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#ff8080',
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});