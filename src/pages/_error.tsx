import { NextPageContext } from 'next';
import Link from 'next/link';

interface ErrorProps {
  statusCode: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>{statusCode}</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        {statusCode === 404 ? 'Page not found' : 'An error occurred'}
      </p>
      <Link
        href="/"
        style={{
          background: '#2563eb',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 500
        }}
      >
        Go Home
      </Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
