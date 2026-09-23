/* =========================================================
   VERITOUS — HERO 3D ENGINEERING FIELD v3

   Visual direction:
   • Invisible software infrastructure
   • Dense peripheral network
   • Quiet center for typography
   • Depth + cursor interaction
   • Subtle motion
   • Premium / editorial — not crypto / AI-template
========================================================= */

(() => {
    const canvas = document.getElementById("hero-canvas");

    if (!canvas || typeof THREE === "undefined") {
        return;
    }

    /* =====================================================
       DEVICE / PERFORMANCE
    ===================================================== */

    const isMobile =
        window.matchMedia("(max-width: 768px)").matches;

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const COUNT = isMobile ? 620 : 1400;

    const MAX_CONNECTIONS =
        isMobile ? 650 : 2100;

    const CONNECTION_DISTANCE =
        isMobile ? 13.5 : 15.5;

    /*
       The typography occupies the center.

       Keep the center quiet, but not completely dead.
       The network should wrap around the headline.
    */

    const CENTER_RADIUS =
        isMobile ? 23 : 27;


    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer =
        new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: !isMobile,
            powerPreference: "high-performance"
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            isMobile ? 1.35 : 1.8
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight,
        false
    );

    renderer.setClearColor(
        0x000000,
        0
    );


    /* =====================================================
       SCENE / CAMERA
    ===================================================== */

    const scene =
        new THREE.Scene();

    const camera =
        new THREE.PerspectiveCamera(
            55,
            window.innerWidth /
                window.innerHeight,
            0.1,
            1000
        );

    camera.position.set(
        0,
        0,
        72
    );


    /* =====================================================
       PARTICLE DATA
    ===================================================== */

    const positions =
        new Float32Array(
            COUNT * 3
        );

    const velocities =
        new Float32Array(
            COUNT * 3
        );

    const phases =
        new Float32Array(
            COUNT
        );

    const colors =
        new Float32Array(
            COUNT * 3
        );


    /* =====================================================
       COLORS
    ===================================================== */

    const indigo =
        new THREE.Color("#6c63ff");

    const violet =
        new THREE.Color("#a99cff");

    const cyan =
        new THREE.Color("#22d3ee");


    /* =====================================================
       PARTICLE POSITION

       Instead of uniformly filling a giant volume,
       distribute the field more heavily around the
       outer edges of the composition.

       This makes the network visible without placing
       noisy particles directly over the headline.
    ===================================================== */

    function createParticlePosition() {

        let x;
        let y;
        let z;

        let attempts = 0;

        do {

            /*
               Slightly elliptical field.

               This produces a wider horizontal
               engineering-system composition.
            */

            x =
                (Math.random() - 0.5) *
                185;

            y =
                (Math.random() - 0.5) *
                108;

            z =
                (Math.random() - 0.5) *
                44;


            /*
               Keep the center relatively clear.

               We use a soft elliptical distance rather
               than a perfect circle so the empty area
               follows the wide headline.
            */

            const normalizedX =
                x / 1.05;

            const normalizedY =
                y / 0.92;

            const centerDistance =
                Math.sqrt(
                    normalizedX * normalizedX +
                    normalizedY * normalizedY
                );


            /*
               Most particles inside the center are rejected.
               A small percentage survives, giving the field
               some depth behind the typography.
            */

            const centerLimit =
                CENTER_RADIUS;

            const rejectCenter =
                centerDistance < centerLimit &&
                Math.random() < 0.94;


            /*
               Bias a few more particles toward the
               left and right sides.

               This gives the hero the feeling of a
               system surrounding the product.
            */

            const tooFarVertical =
                Math.abs(y) > 49 &&
                Math.random() < 0.45;

            if (
                !rejectCenter &&
                !tooFarVertical
            ) {
                break;
            }

            attempts++;

        } while (
            attempts < 30
        );


        return {
            x,
            y,
            z
        };
    }


    /* =====================================================
       CREATE PARTICLES
    ===================================================== */

    for (
        let i = 0;
        i < COUNT;
        i++
    ) {

        const i3 =
            i * 3;

        const point =
            createParticlePosition();


        positions[i3] =
            point.x;

        positions[i3 + 1] =
            point.y;

        positions[i3 + 2] =
            point.z;


        /*
           Slow natural drift.
        */

        velocities[i3] =
            (Math.random() - 0.5) *
            0.006;

        velocities[i3 + 1] =
            (Math.random() - 0.5) *
            0.006;

        velocities[i3 + 2] =
            (Math.random() - 0.5) *
            0.002;


        phases[i] =
            Math.random() *
            Math.PI *
            2;


        /* ---------------------------------------------
           Color distribution
        --------------------------------------------- */

        const mix =
            Math.random();

        let color;

        if (
            mix < 0.52
        ) {

            color =
                indigo.clone().lerp(
                    violet,
                    mix / 0.52
                );

        } else {

            color =
                violet.clone().lerp(
                    cyan,
                    (mix - 0.52) /
                    0.48
                );
        }


        colors[i3] =
            color.r;

        colors[i3 + 1] =
            color.g;

        colors[i3 + 2] =
            color.b;
    }


    /* =====================================================
       PARTICLE GEOMETRY
    ===================================================== */

    const particleGeometry =
        new THREE.BufferGeometry();

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );

    particleGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(
            colors,
            3
        )
    );


    /* =====================================================
       PARTICLE MATERIAL
    ===================================================== */

    const particleMaterial =
        new THREE.PointsMaterial({

            /*
               Slightly larger than v2.

               The goal is for individual nodes to remain
               visible without becoming glowing stars.
            */

            size:
                isMobile
                    ? 0.82
                    : 1.05,

            vertexColors:
                true,

            transparent:
                true,

            opacity:
                isMobile
                    ? 0.58
                    : 0.68,

            sizeAttenuation:
                true,

            depthWrite:
                false,

            blending:
                THREE.AdditiveBlending
        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );

    scene.add(
        particles
    );


    /* =====================================================
       CONNECTION NETWORK
    ===================================================== */

    const linePositions =
        new Float32Array(
            MAX_CONNECTIONS * 6
        );

    const lineColors =
        new Float32Array(
            MAX_CONNECTIONS * 6
        );


    const lineGeometry =
        new THREE.BufferGeometry();

    lineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            linePositions,
            3
        )
    );

    lineGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(
            lineColors,
            3
        )
    );

    lineGeometry.setDrawRange(
        0,
        0
    );


    const lineMaterial =
        new THREE.LineBasicMaterial({

            vertexColors:
                true,

            transparent:
                true,

            /*
               This is intentionally stronger than v2.

               The individual connection alpha is also
               distance-weighted below.
            */

            opacity:
                isMobile
                    ? 0.17
                    : 0.22,

            blending:
                THREE.AdditiveBlending,

            depthWrite:
                false
        });


    const network =
        new THREE.LineSegments(
            lineGeometry,
            lineMaterial
        );

    scene.add(
        network
    );


    /* =====================================================
       SPATIAL GRID

       Finds actual nearby particles instead of relying
       on array order.
    ===================================================== */

    function buildConnections() {

        const pos =
            particleGeometry
                .attributes
                .position
                .array;


        const cellSize =
            CONNECTION_DISTANCE;


        const grid =
            new Map();


        const key =
            (x, y, z) =>
                `${x}|${y}|${z}`;


        /*
           Put particles into spatial cells.
        */

        for (
            let i = 0;
            i < COUNT;
            i++
        ) {

            const i3 =
                i * 3;

            const cellX =
                Math.floor(
                    pos[i3] /
                    cellSize
                );

            const cellY =
                Math.floor(
                    pos[i3 + 1] /
                    cellSize
                );

            const cellZ =
                Math.floor(
                    pos[i3 + 2] /
                    cellSize
                );


            const cellKey =
                key(
                    cellX,
                    cellY,
                    cellZ
                );


            if (
                !grid.has(
                    cellKey
                )
            ) {

                grid.set(
                    cellKey,
                    []
                );
            }


            grid
                .get(cellKey)
                .push(i);
        }


        let connectionCount =
            0;


        /*
           Search nearby cells.

           Because the particles are now more densely
           distributed, the network naturally forms
           visible constellations.
        */

        for (
            let i = 0;
            i < COUNT &&
            connectionCount <
                MAX_CONNECTIONS;
            i++
        ) {

            const i3 =
                i * 3;

            const ax =
                pos[i3];

            const ay =
                pos[i3 + 1];

            const az =
                pos[i3 + 2];


            const cellX =
                Math.floor(
                    ax /
                    cellSize
                );

            const cellY =
                Math.floor(
                    ay /
                    cellSize
                );

            const cellZ =
                Math.floor(
                    az /
                    cellSize
                );


            for (
                let ox = -1;
                ox <= 1 &&
                connectionCount <
                    MAX_CONNECTIONS;
                ox++
            ) {

                for (
                    let oy = -1;
                    oy <= 1 &&
                    connectionCount <
                        MAX_CONNECTIONS;
                    oy++
                ) {

                    for (
                        let oz = -1;
                        oz <= 1 &&
                        connectionCount <
                            MAX_CONNECTIONS;
                        oz++
                    ) {

                        const candidates =
                            grid.get(
                                key(
                                    cellX + ox,
                                    cellY + oy,
                                    cellZ + oz
                                )
                            );


                        if (
                            !candidates
                        ) {
                            continue;
                        }


                        for (
                            const j
                            of candidates
                        ) {

                            if (
                                j <= i ||
                                connectionCount >=
                                    MAX_CONNECTIONS
                            ) {
                                continue;
                            }


                            const j3 =
                                j * 3;


                            const dx =
                                ax -
                                pos[j3];

                            const dy =
                                ay -
                                pos[j3 + 1];

                            const dz =
                                az -
                                pos[j3 + 2];


                            const distanceSquared =
                                dx * dx +
                                dy * dy +
                                dz * dz;


                            if (
                                distanceSquared >
                                CONNECTION_DISTANCE *
                                CONNECTION_DISTANCE
                            ) {
                                continue;
                            }


                            /*
                               Midpoint lets us keep
                               the typography zone quiet.
                            */

                            const midpointX =
                                (
                                    ax +
                                    pos[j3]
                                ) * 0.5;

                            const midpointY =
                                (
                                    ay +
                                    pos[j3 + 1]
                                ) * 0.5;


                            const centerDistance =
                                Math.sqrt(
                                    (
                                        midpointX /
                                        1.05
                                    ) *
                                    (
                                        midpointX /
                                        1.05
                                    ) +
                                    (
                                        midpointY /
                                        0.92
                                    ) *
                                    (
                                        midpointY /
                                        0.92
                                    )
                                );


                            if (
                                centerDistance <
                                CENTER_RADIUS *
                                0.72
                            ) {
                                continue;
                            }


                            const distance =
                                Math.sqrt(
                                    distanceSquared
                                );


                            /*
                               Stronger connections near
                               each other, softer at the edge.
                            */

                            const strength =
                                1 -
                                distance /
                                CONNECTION_DISTANCE;


                            const alpha =
                                Math.pow(
                                    strength,
                                    0.72
                                );


                            const li =
                                connectionCount *
                                6;


                            linePositions[li] =
                                ax;

                            linePositions[li + 1] =
                                ay;

                            linePositions[li + 2] =
                                az;


                            linePositions[li + 3] =
                                pos[j3];

                            linePositions[li + 4] =
                                pos[j3 + 1];

                            linePositions[li + 5] =
                                pos[j3 + 2];


                            /*
                               Indigo / violet / cyan
                               engineering-field color.
                            */

                            const lineStrength =
                                0.42 *
                                alpha;


                            lineColors[li] =
                                0.36 *
                                lineStrength;

                            lineColors[li + 1] =
                                0.44 *
                                lineStrength;

                            lineColors[li + 2] =
                                1.0 *
                                lineStrength;


                            lineColors[li + 3] =
                                0.36 *
                                lineStrength;

                            lineColors[li + 4] =
                                0.44 *
                                lineStrength;

                            lineColors[li + 5] =
                                1.0 *
                                lineStrength;


                            connectionCount++;
                        }
                    }
                }
            }
        }


        lineGeometry.setDrawRange(
            0,
            connectionCount * 2
        );


        lineGeometry
            .attributes
            .position
            .needsUpdate =
            true;

        lineGeometry
            .attributes
            .color
            .needsUpdate =
            true;
    }


    /* =====================================================
       CENTRAL CORE

       Extremely subtle.

       This is not meant to look like an orb.
       It should simply make the center feel alive.
    ===================================================== */

    const coreGeometry =
        new THREE.SphereGeometry(
            1.5,
            24,
            24
        );


    const coreMaterial =
        new THREE.MeshBasicMaterial({

            color:
                0x8f83ff,

            transparent:
                true,

            opacity:
                0.08,

            depthWrite:
                false,

            blending:
                THREE.AdditiveBlending
        });


    const core =
        new THREE.Mesh(
            coreGeometry,
            coreMaterial
        );


    core.position.set(
        0,
        0,
        -7
    );


    core.scale.setScalar(
        0.85
    );


    scene.add(
        core
    );


    /* =====================================================
       MOUSE
    ===================================================== */

    const mouse = {

        x: 0,
        y: 0,

        targetX: 0,
        targetY: 0,

        speed: 0
    };


    let previousMouseX = 0;
    let previousMouseY = 0;


    window.addEventListener(
        "pointermove",
        (event) => {

            const nextX =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 2;


            const nextY =
                -(
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 2;


            mouse.targetX =
                nextX;

            mouse.targetY =
                nextY;


            const dx =
                nextX -
                previousMouseX;

            const dy =
                nextY -
                previousMouseY;


            mouse.speed =
                Math.min(
                    1,
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    ) * 7
                );


            previousMouseX =
                nextX;

            previousMouseY =
                nextY;
        },
        {
            passive: true
        }
    );


    /* =====================================================
       SCROLL
    ===================================================== */

    let scrollProgress =
        0;

    let targetScroll =
        0;


    window.addEventListener(
        "scroll",
        () => {

            targetScroll =
                Math.min(
                    1,
                    window.scrollY /
                    Math.max(
                        window.innerHeight,
                        1
                    )
                );
        },
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    function resize() {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight,
            false
        );
    }


    window.addEventListener(
        "resize",
        resize
    );


    /* =====================================================
       VISIBILITY
    ===================================================== */

    let isVisible =
        true;


    document.addEventListener(
        "visibilitychange",
        () => {

            isVisible =
                document.visibilityState ===
                "visible";
        }
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    const clock =
        new THREE.Clock();


    let connectionTimer =
        0;


    let lastFrame =
        performance.now();


    function animate(
        now = performance.now()
    ) {

        requestAnimationFrame(
            animate
        );


        if (!isVisible) {
            return;
        }


        /*
           Normalize movement against frame time.
        */

        const delta =
            Math.min(
                (
                    now -
                    lastFrame
                ) / 16.67,
                2
            );


        lastFrame =
            now;


        const time =
            clock.getElapsedTime();


        /* ---------------------------------------------
           Smooth mouse
        --------------------------------------------- */

        mouse.x +=
            (
                mouse.targetX -
                mouse.x
            ) *
            0.035;

        mouse.y +=
            (
                mouse.targetY -
                mouse.y
            ) *
            0.035;


        mouse.speed *=
            Math.pow(
                0.94,
                delta
            );


        /* ---------------------------------------------
           Smooth scroll
        --------------------------------------------- */

        scrollProgress +=
            (
                targetScroll -
                scrollProgress
            ) *
            0.04;


        const pos =
            particleGeometry
                .attributes
                .position
                .array;


        /* ---------------------------------------------
           Convert cursor to field coordinates
        --------------------------------------------- */

        const cursorX =
            mouse.x *
            58;

        const cursorY =
            mouse.y *
            36;


        /* ---------------------------------------------
           Particle movement
        --------------------------------------------- */

        for (
            let i = 0;
            i < COUNT;
            i++
        ) {

            const i3 =
                i * 3;

            const phase =
                phases[i];


            /*
               Natural drift.
            */

            pos[i3] +=
                velocities[i3] *
                delta;

            pos[i3 + 1] +=
                velocities[i3 + 1] *
                delta;

            pos[i3 + 2] +=
                velocities[i3 + 2] *
                delta;


            /*
               Organic breathing motion.
            */

            pos[i3] +=
                Math.sin(
                    time * 0.15 +
                    phase
                ) *
                0.0022 *
                delta;

            pos[i3 + 1] +=
                Math.cos(
                    time * 0.12 +
                    phase
                ) *
                0.0022 *
                delta;


            /*
               Cursor interaction.

               The field gently moves away from the
               cursor instead of chasing it.
            */

            const dx =
                pos[i3] -
                cursorX;

            const dy =
                pos[i3 + 1] -
                cursorY;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            const influence =
                Math.max(
                    0,
                    1 -
                    distance /
                    28
                );


            if (
                influence > 0
            ) {

                const force =
                    influence *
                    influence *
                    (
                        0.025 +
                        mouse.speed *
                        0.05
                    );


                pos[i3] +=
                    dx *
                    force *
                    delta;

                pos[i3 + 1] +=
                    dy *
                    force *
                    delta;
            }


            /*
               Very subtle vertical scroll movement.
            */

            pos[i3 + 1] +=
                scrollProgress *
                0.005 *
                delta;


            /* -----------------------------------------
               Wrap field
            ----------------------------------------- */

            if (
                pos[i3] > 95
            ) {
                pos[i3] =
                    -95;
            }

            if (
                pos[i3] < -95
            ) {
                pos[i3] =
                    95;
            }


            if (
                pos[i3 + 1] > 55
            ) {
                pos[i3 + 1] =
                    -55;
            }

            if (
                pos[i3 + 1] < -55
            ) {
                pos[i3 + 1] =
                    55;
            }


            if (
                pos[i3 + 2] > 25
            ) {
                pos[i3 + 2] =
                    -25;
            }

            if (
                pos[i3 + 2] < -25
            ) {
                pos[i3 + 2] =
                    25;
            }
        }


        particleGeometry
            .attributes
            .position
            .needsUpdate =
            true;


        /* ---------------------------------------------
           Camera parallax
        --------------------------------------------- */

        const targetCameraX =
            mouse.x *
            2.2;

        const targetCameraY =
            mouse.y *
            1.5 -
            scrollProgress *
            0.9;


        camera.position.x +=
            (
                targetCameraX -
                camera.position.x
            ) *
            0.025;

        camera.position.y +=
            (
                targetCameraY -
                camera.position.y
            ) *
            0.025;

        camera.position.z +=
            (
                72 -
                camera.position.z
            ) *
            0.025;


        /* ---------------------------------------------
           Network movement
        --------------------------------------------- */

        particles.rotation.y =
            Math.sin(
                time *
                0.05
            ) *
            0.035 +
            mouse.x *
            0.014;

        particles.rotation.x =
            Math.cos(
                time *
                0.04
            ) *
            0.018 +
            mouse.y *
            0.009;


        network.rotation.y =
            particles.rotation.y;

        network.rotation.x =
            particles.rotation.x;


        /* ---------------------------------------------
           Central system pulse
        --------------------------------------------- */

        const corePulse =
            0.82 +
            Math.sin(
                time *
                0.8
            ) *
            0.08;


        core.scale.setScalar(
            prefersReducedMotion
                ? 0.82
                : corePulse
        );


        core.material.opacity =
            0.055 +
            Math.sin(
                time *
                0.75
            ) *
            0.012;


        /* ---------------------------------------------
           Rebuild spatial connections

           We don't need to rebuild every frame.
           This keeps the field fluid without wasting
           CPU/GPU work.
        --------------------------------------------- */

        connectionTimer +=
            delta /
            60;


        if (
            connectionTimer >
            (
                isMobile
                    ? 0.22
                    : 0.14
            )
        ) {

            buildConnections();

            connectionTimer =
                0;
        }


        /* ---------------------------------------------
           Reduced motion
        --------------------------------------------- */

        if (
            prefersReducedMotion
        ) {

            particles.rotation.set(
                0,
                0,
                0
            );

            network.rotation.set(
                0,
                0,
                0
            );
        }


        /* ---------------------------------------------
           Render
        --------------------------------------------- */

        renderer.render(
            scene,
            camera
        );
    }


    /* =====================================================
       START
    ===================================================== */

    buildConnections();

    animate();

})();