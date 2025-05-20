import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ZellerCustomers from '../src/components/zellerCustomers';
import { NavigationContainer } from "@react-navigation/native";

jest.mock('../src/common/graphQLService', () => ({
  executeQuery: jest.fn(() =>
    Promise.resolve({
      listZellerCustomers: {
        items: [
          { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
          { id: '2', name: 'Manager User', email: 'manager@example.com', role: 'Manager' },
        ]
      }
    })
  ),
}));

describe('ZellerCustomers', () => {

  it('filters to only Admin users when Admin checkbox is selected', async () => {
    const root = render(
      <NavigationContainer>
        <ZellerCustomers />
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(root.getByText('Admin User')).toBeTruthy();
      expect(root.getByText('Manager User')).toBeTruthy();
    });
    fireEvent.press(root.getByTestId('checkbox-admin'));
    await waitFor(() => {
      expect(root.getByText('Admin User')).toBeTruthy();
      expect(root.queryByText('Manager User')).toBeNull();
    });
  });

  it('filters to only manager users when manager checkbox is selected', async () => {
    const root = render(
      <NavigationContainer>
        <ZellerCustomers />
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(root.getByText('Admin User')).toBeTruthy();
      expect(root.getByText('Manager User')).toBeTruthy();
    });
    fireEvent.press(root.getByTestId('checkbox-manager'));
    await waitFor(() => {
      expect(root.getByText('Manager User')).toBeTruthy();
      expect(root.queryByText('Admin User')).toBeNull();
    });
  });

  it('filters users based on search input', async () => {
    const root = render(
      <NavigationContainer>
        <ZellerCustomers />
      </NavigationContainer>
    );
    fireEvent.changeText(root.getByTestId('search'), 'manager');
    await waitFor(() => {
      expect(root.getByText('Manager User')).toBeTruthy();
      expect(root.queryByText('Admin User')).toBeNull();
    });
  });

  it('resets user filters and reloads list on refresh', async () => {
    const root = render(
      <NavigationContainer>
        <ZellerCustomers />
      </NavigationContainer>
    );
    await waitFor(() => {
      root.getByTestId('user').props.refreshControl.props.onRefresh();
    });
  });

  it('logs an error if getAllUsers fails', async () => {
    const mockError = new Error('Fetch failed');
    const { executeQuery } = require('../src/common/graphQLService');
    executeQuery.mockImplementationOnce(() => Promise.reject(mockError));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    render(
      <NavigationContainer>
        <ZellerCustomers />
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch users:', mockError);
    });
    consoleErrorSpy.mockRestore();
  });

});
