// ── THREE.JS PARTICLE FIELD ─────────────────────────────────────────
    (function () {
      const canvas = document.getElementById('hero-canvas');
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 80;

      const COUNT = 1600;
      const positions = new Float32Array(COUNT * 3);
      const velocities = [];
      const colors = new Float32Array(COUNT * 3);

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 200;
        positions[i3 + 1] = (Math.random() - 0.5) * 200;
        positions[i3 + 2] = (Math.random() - 0.5) * 80;
        velocities.push({
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: 0
        });
        const t = Math.random();
        colors[i3] = 0.42 + t * (0 - 0.42);
        colors[i3 + 1] = 0.39 + t * (0.831 - 0.39);
        colors[i3 + 2] = 1.0;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.9,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      let mouseX = 0, mouseY = 0;
      document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      });

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      function animate() {
        requestAnimationFrame(animate);

        const pos = geo.attributes.position.array;
        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          pos[i3] += velocities[i].x + mouseX * 0.003;
          pos[i3 + 1] += velocities[i].y + mouseY * 0.003;

          if (pos[i3] > 100) pos[i3] = -100;
          if (pos[i3] < -100) pos[i3] = 100;
          if (pos[i3 + 1] > 100) pos[i3 + 1] = -100;
          if (pos[i3 + 1] < -100) pos[i3 + 1] = 100;
        }
        geo.attributes.position.needsUpdate = true;

        points.rotation.y += 0.0003 + mouseX * 0.0002;
        points.rotation.x += 0.0002 + mouseY * 0.0001;

        renderer.render(scene, camera);
      }
      animate();
    })();
