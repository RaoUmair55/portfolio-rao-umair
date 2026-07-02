// Bokeh background orbs — green + gold palette
const BokehOrbs = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    {/* Deep forest green large */}
    <div className="bokeh-orb" style={{
      width: 600, height: 600, top: '-15%', left: '55%',
      background: 'radial-gradient(circle, #0F5D36, transparent)',
      '--dur': '24s', '--dx1': '40px', '--dy1': '-60px',
      '--dx2': '-30px', '--dy2': '50px', '--dx3': '20px', '--dy3': '-30px',
    } as React.CSSProperties} />
    {/* Bright green mid */}
    <div className="bokeh-orb" style={{
      width: 400, height: 400, top: '30%', left: '-8%',
      background: 'radial-gradient(circle, #16A34A, transparent)',
      '--dur': '30s', '--delay': '-5s',
      '--dx1': '50px', '--dy1': '30px', '--dx2': '-40px', '--dy2': '-60px',
      '--dx3': '30px', '--dy3': '50px',
    } as React.CSSProperties} />
    {/* Gold */}
    <div className="bokeh-orb" style={{
      width: 280, height: 280, top: '65%', left: '78%',
      background: 'radial-gradient(circle, #f59e0b, transparent)',
      '--dur': '20s', '--delay': '-8s',
      '--dx1': '-30px', '--dy1': '-40px', '--dx2': '40px', '--dy2': '30px',
      '--dx3': '-20px', '--dy3': '-20px',
    } as React.CSSProperties} />
    {/* Neon green small */}
    <div className="bokeh-orb" style={{
      width: 220, height: 220, top: '78%', left: '25%',
      background: 'radial-gradient(circle, #4ADE80, transparent)',
      '--dur': '26s', '--delay': '-12s',
      '--dx1': '30px', '--dy1': '-20px', '--dx2': '-50px', '--dy2': '40px',
      '--dx3': '20px', '--dy3': '-30px',
    } as React.CSSProperties} />
    {/* Teal accent */}
    <div className="bokeh-orb" style={{
      width: 200, height: 200, top: '48%', left: '88%',
      background: 'radial-gradient(circle, #0d9488, transparent)',
      '--dur': '22s', '--delay': '-3s',
      '--dx1': '-20px', '--dy1': '30px', '--dx2': '30px', '--dy2': '-20px',
      '--dx3': '-40px', '--dy3': '10px',
    } as React.CSSProperties} />
    {/* Forest bottom */}
    <div className="bokeh-orb" style={{
      width: 350, height: 350, top: '92%', left: '10%',
      background: 'radial-gradient(circle, #0F5D36, transparent)',
      '--dur': '28s', '--delay': '-15s',
      '--dx1': '60px', '--dy1': '-30px', '--dx2': '-30px', '--dy2': '40px',
      '--dx3': '20px', '--dy3': '-50px',
    } as React.CSSProperties} />
  </div>
);

export default BokehOrbs;
