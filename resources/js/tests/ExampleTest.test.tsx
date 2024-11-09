import { render, screen } from '@testing-library/react';
import PrimaryButton from '@/Components/PrimaryButton';

test('renders a button', () => {
    render(<PrimaryButton>Primary button text</PrimaryButton>);
    expect(screen.getByText(/primary button text/i)).toBeInTheDocument();
});
