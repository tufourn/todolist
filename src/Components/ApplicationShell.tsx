import {
	AppShell,
	Header,
	Text,
	Group,
	useMantineTheme,
} from '@mantine/core';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Routes
} from 'react-router-dom'
import LightDarkButton from './LightDarkButton';
import ToDoListApp from './ToDoListApp';

export default function ApplicationShell() {
	const theme = useMantineTheme();
	return (
		<Router>
			<AppShell
				styles={{
					main: {
						background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					},
				}}
				header={
					<Header height={70} p="md">
						<Group position="apart">
							<Text
								align="center"
								variant="gradient"
								gradient={{ from: 'indigo', to: 'red', deg: 45 }}
								size="xl"
								weight={700}
								style={{ fontFamily: 'Open sans, sans-serif' }}
								component={Link}
								to="/"
							> 
								tufourn
							</Text>
							<LightDarkButton />
						</Group>
					</Header>	
				}
			>
				<Routes>
					<Route path="/" element={<ToDoListApp />} />
				</Routes>
			</AppShell>
		</Router>

	);
}