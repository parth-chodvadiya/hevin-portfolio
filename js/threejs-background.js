// 3D Background with Three.js
class ThreeJSBackground {
    constructor() {
        this.canvas = document.getElementById('threejs-background');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.meshes = [];
        this.init();
    }

    init() {
        if (!this.canvas) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        this.createObjects();
        this.createLights();
        this.setupCamera();
        this.animate();
        this.handleResize();
    }

    createObjects() {
        // Create floating geometric shapes
        const geometries = [
            new THREE.BoxGeometry(0.8, 0.8, 0.8),
            new THREE.SphereGeometry(0.4, 16, 16),
            new THREE.ConeGeometry(0.4, 0.8, 16),
            new THREE.TorusGeometry(0.4, 0.15, 8, 50),
            new THREE.OctahedronGeometry(0.4)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.4 }),
            new THREE.MeshPhongMaterial({ color: 0x1E3A8A, transparent: true, opacity: 0.3 }),
            new THREE.MeshPhongMaterial({ color: 0x0A1628, transparent: true, opacity: 0.2 }),
        ];
        
        // Create fewer objects for better performance
        for (let i = 0; i < 8; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            // Position objects more spread out
            mesh.position.x = (Math.random() - 0.5) * 15;
            mesh.position.y = (Math.random() - 0.5) * 15;
            mesh.position.z = (Math.random() - 0.5) * 15;
            
            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;
            
            // Random scale
            const scale = Math.random() * 0.4 + 0.3;
            mesh.scale.set(scale, scale, scale);
            
            this.scene.add(mesh);
            this.meshes.push(mesh);
        }
    }

    createLights() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xD4AF37, 0.6);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0x1E3A8A, 0.4, 100);
        pointLight.position.set(-5, -5, -5);
        this.scene.add(pointLight);
    }

    setupCamera() {
        this.camera.position.z = 12;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate all meshes slowly
        this.meshes.forEach((mesh, index) => {
            mesh.rotation.x += 0.001 * (index % 2 === 0 ? 1 : -1);
            mesh.rotation.y += 0.002 * (index % 3 === 0 ? 1 : -1);
            mesh.rotation.z += 0.0005 * (index % 4 === 0 ? 1 : -1);
            
            // Subtle floating movement
            mesh.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.001;
        });
        
        // Very subtle camera movement
        this.camera.position.x = Math.sin(Date.now() * 0.0002) * 0.5;
        this.camera.position.y = Math.cos(Date.now() * 0.0001) * 0.3;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Export for use in main.js
window.ThreeJSBackground = ThreeJSBackground;
