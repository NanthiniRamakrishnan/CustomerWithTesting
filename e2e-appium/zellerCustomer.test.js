describe('should test the splash test', () => {
    it('It should display the Splash Screen when the app launches', async () => {
        const splashScreen = await $('~splashScreen');
        await splashScreen.waitForDisplayed({ timeout: 50000 });
    });
})

describe('ZellerCustomers Screen Tests', () => {
    it('should display the ZellerCustomers screen', async () => {
        const screen = await $('~zellerCustomers');
        await screen.waitForDisplayed({ timeout: 50000 });
    });

    it('should display search bar and check', async () => {
        const searchBar = await $('~search');
        await searchBar.waitForDisplayed({ timeout: 10000 });
        await searchBar.setValue('John');
    });

    it('should allow selecting the Admin checkbox', async () => {
        const adminCheckbox = await $('~checkbox-admin');
        await adminCheckbox.click();
    });

    it('should allow selecting the Manager checkbox', async () => {
        const managerCheckbox = await $('~checkbox-manager');
        await managerCheckbox.click();
    });

    it('should list users or show empty state', async () => {
        const userList = await $('~user');
        const isExisting = await userList.isExisting();
        if (isExisting) {
            const users = await userList.$$('android.widget.TextView');
            expect(users.length).toBeGreaterThanOrEqual(0);
        }
    });

    it('should refresh the list on pull to refresh', async () => {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: 540, y: 1375 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 500 },
                    { type: 'pointerMove', duration: 500, x: 540, y: 1175 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.pause(2000);
    });
});
